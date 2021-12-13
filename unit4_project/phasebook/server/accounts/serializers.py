from django.contrib.auth.models import User
from rest_framework import serializers
# from rest_framework.fields import SerializerMethodField
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from accounts.models import UserProfile, FriendList
from main.serializers import PostUserProfileSerializer

class SubUserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(read_only=True)
    last_name = serializers.CharField(read_only=True)
    user_profile = PostUserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'user_profile'
        )

class FriendListSerializer(serializers.ModelSerializer):
    friends = SubUserSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = FriendList
        fields = [
            'friends'
        ]

class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        read_only=False,
        queryset=User.objects.all(),
        slug_field="username"
    )

    class Meta:
        model = UserProfile
        fields = [
            'cover_photo',
            'profile_photo',
            'user',
        ]
    
    def create(self, validated_data):
        profile = UserProfile.objects.create(**validated_data)

        return profile

class UserSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer(required=False)
    # friend_list = serializers.SerializerMethodField("get_friend_list")
    friend_list = FriendListSerializer(required=False)

    class Meta:
        model = User
        fields = [
            'username', 
            'first_name', 
            'last_name', 
            'email', 
            'password',
            'user_profile',
            'friend_list'
        ]
        extra_kwargs = {
            'password': { 'write_only': True }
        }
    
    # def get_friend_list(self, user):
    #     serializer = FriendListSerializer(instance=user.friend_list)
    #     return serializer.data["friends"]
        
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user

    def update(self, instance, validated_data):
        user_profile = validated_data.pop('user_profile')
        instance = super().update(instance, validated_data)

        if "cover_photo" in user_profile:
            instance.user_profile.cover_photo = user_profile.get("cover_photo", instance.user_profile.cover_photo)
        if "profile_photo" in user_profile:
            instance.user_profile.profile_photo = user_profile.get("profile_photo", instance.user_profile.profile_photo)
            
        instance.user_profile.save()            
        return instance

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        # Custom data you want to include
        data.update({'id': self.user.id})
        data.update({'username': self.user.username})

        return data
