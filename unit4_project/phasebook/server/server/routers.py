from rest_framework.routers import SimpleRouter
from main.views import PostViewSet

router = SimpleRouter()
router.register(r'post', PostViewSet, basename='post')

urlpatterns = router.urls
