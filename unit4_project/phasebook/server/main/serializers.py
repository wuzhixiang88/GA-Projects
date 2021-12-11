from rest_framework import serializers
from django.contrib.auth.models import User
from accounts.models import UserProfile
from main.models import Post, Comment, Reply

class PostUserProfileSerializer(serializers.ModelSerializer):
    profile_photo = serializers.ImageField(read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            'profile_photo'
        ]

class PostUserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(read_only=True)
    last_name = serializers.CharField(read_only=True)
    user_profile = PostUserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'user_profile'
        ]

class ReplySerializer(serializers.ModelSerializer):
    user = PostUserSerializer(read_only=True)
    body = serializers.CharField(required=True)
    comment_id = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Reply
        fields = [
            'id',
            'body',
            'like',
            'created_at',
            'updated_at',
            'user',
            'comment_id',
        ]

class CommentSerializer(serializers.ModelSerializer):
    user = PostUserSerializer(read_only=True)
    body = serializers.CharField(required=True)
    post_id = serializers.PrimaryKeyRelatedField(read_only=True)
    replies = ReplySerializer(many=True, read_only=True)

    class Meta:
        model = Comment
        fields = [
            'id',
            'body',
            'like',
            'created_at',
            'updated_at',
            'user',
            'post_id',
            'replies',
        ]
        
class PostSerializer(serializers.ModelSerializer):
    user = PostUserSerializer(read_only=True)
    body = serializers.CharField(required=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            'id',
            'body',
            'photo',
            'like',
            'created_at',
            'updated_at',
            'user',
            'comments',
        ]
        ordering = ['-created_at']
