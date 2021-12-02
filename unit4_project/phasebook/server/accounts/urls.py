from django.urls import path
from accounts import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('api/register', views.Register.as_view(), name='register'),
    path('api/profile', views.UserProfile.as_view(), name='profile'),
    path('api/profile/<int:pk>', views.UserProfile.as_view(), name='profile'),
    path('api/logout', views.Logout.as_view(), name='logout'),
    path('api/token', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]

