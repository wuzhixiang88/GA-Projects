from django.urls import path
from accounts import views

urlpatterns = [
    path('api/register', views.register, name='register')
]

