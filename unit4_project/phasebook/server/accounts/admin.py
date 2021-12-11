from django.contrib import admin
from accounts.models import UserProfile, FriendList, FriendRequest

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(FriendList)
admin.site.register(FriendRequest)
