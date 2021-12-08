from rest_framework.routers import SimpleRouter
from main.views import PostViewSet, CommentViewSet

router = SimpleRouter()
router.register(r'post', PostViewSet, basename='post')
router.register(r'comment', CommentViewSet, basename='comment')

urlpatterns = router.urls
