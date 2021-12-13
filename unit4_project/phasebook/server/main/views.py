from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from main.models import Post, Comment, Reply
from main.serializers import PostSerializer, CommentSerializer, ReplySerializer

# Create your views here.
class UserPostViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticated]

    serializer_class = PostSerializer

    def get_queryset(self):
        user = get_object_or_404(User, pk=self.kwargs.get('user_pk'))
        return Post.objects.filter(user=user).order_by('-created_at')

class PostViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticated]

    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CommentViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticated]

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        post_pk = self.kwargs.get('post_pk')
        post = get_object_or_404(Post, pk=post_pk)

        serializer.save(user=self.request.user, post=post)

class ReplyViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticated]

    queryset = Reply.objects.all()
    serializer_class = ReplySerializer

    def perform_create(self, serializer):
        comment_pk = self.kwargs.get('comment_pk')
        comment = get_object_or_404(Comment, pk=comment_pk)

        serializer.save(user=self.request.user, comment=comment)