from django.contrib.auth.models import User
from rest_framework import serializers
from accounts.models import UserProfile

class UserSerializer(serializers.HyperlinkedModelSerializer):
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

class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'cover_photo',
            'profile_photo',
        ]
    
    def create(self, validated_data):
        profile = UserProfile.objects.create(**validated_data)

        return profile
