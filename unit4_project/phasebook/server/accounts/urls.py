from django.urls import path
from accounts import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('api/register', views.Register.as_view(), name='register'),
    path('api/profile', views.SetUserProfile.as_view(), name='set_user_profile'),
    path('api/profile/edit/<int:pk>', views.UpdateUserProfile.as_view(), name='update_user_profile'),
    path('api/profile/<int:pk>', views.GetUserProfile.as_view(), name='get_user_profile'),
    path('api/friendlist', views.SetFriendList.as_view(), name='set_friend_list'),
    path('api/friendrequest', views.SetFriendRequest.as_view(), name='set_friend_request'),
    path('api/logout', views.Logout.as_view(), name='logout'),
    path('api/token', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]

