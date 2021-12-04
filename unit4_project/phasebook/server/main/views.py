from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Post
from .serializers import PostSerializer

# Create your views here.
class PostViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticated]

    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
