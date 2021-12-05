from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post

class PostUserSerializer(serializers.ModelSerializer):

    first_name = serializers.CharField(read_only=True)
    last_name = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name'
        )

class PostSerializer(serializers.ModelSerializer):
    user = PostUserSerializer(read_only=True)
    body = serializers.CharField(required=True)

    class Meta:
        model = Post
        fields = (
            'body',
            'photo',
            'like',
            'created_at',
            'updated_at',
            'user',
        )