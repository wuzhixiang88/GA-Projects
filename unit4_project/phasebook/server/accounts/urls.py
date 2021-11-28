from django.urls import path
from accounts import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('api/register', views.register, name='register'),
    path('api/token', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh')
]

