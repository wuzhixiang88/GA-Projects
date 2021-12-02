from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from accounts.models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username', 
            'first_name', 
            'last_name', 
            'email', 
            'password'
        ]
        extra_kwargs = {
            'password': { 'write_only': True }
        }
        
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user

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
            'user'
        ]
    
    def create(self, validated_data):
        profile = UserProfile.objects.create(**validated_data)

        return profile

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        # Custom data you want to include
        data.update({'username': self.user.username})
        data.update({'id': self.user.id})

        return data
