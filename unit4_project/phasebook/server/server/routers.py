from rest_framework_nested import routers
from django.urls import path, include
from main.views import PostViewSet, CommentViewSet, ReplyViewSet, UserPostViewSet

router = routers.SimpleRouter()

## generates:
# /user/
# /user/{pk}/
router.register(r'user', UserPostViewSet, basename='user')

## generates:
# /post/
# /post/{pk}/
router.register(r'post', PostViewSet, basename='post')

## generates:
# /post/{post_pk}/comment/
# /post/{post_pk}/comment/{comment_pk}/
post_router = routers.NestedSimpleRouter(router, r'post', lookup='post')
post_router.register(r'comment', CommentViewSet, basename='comment')

## generates:
# /user/{user_pk}/post/
# /user/{user_pk}/post/{post_pk}/
user_post_router = routers.NestedSimpleRouter(router, r'user', lookup='user')
user_post_router.register(r'post', UserPostViewSet, basename='user_post')

# ## generates:
# # /post/{post_pk}/comment/{comment_pk}/reply/
# # /post/{post_pk}/comment/{comment_pk}/reply/{pk}/
comment_router = routers.NestedSimpleRouter(post_router, r'comment', lookup='comment')
comment_router.register(r'reply', ReplyViewSet, basename='reply')
