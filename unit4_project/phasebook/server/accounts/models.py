from django.db import models
from django.contrib.auth.models import User

# Create your models here.
def cover_photos_upload_path(instance, filename):
    return '/'.join([
        'covers', 
        filename
    ])

def profile_photos_upload_path(instance, filename):
    return '/'.join([
        'profiles', 
        filename
    ])

class UserProfile(models.Model):
    user = models.OneToOneField(
        to=User,
        on_delete=models.CASCADE,
        related_name='user_profile'
    )

    cover_photo = models.ImageField(blank=True, null=True, upload_to=cover_photos_upload_path)
    profile_photo = models.ImageField(blank=True, null=True, upload_to=profile_photos_upload_path)

class FriendList(models.Model):
    user = models.OneToOneField(
        to=User,
        on_delete=models.CASCADE,
        related_name='friend_list'
    )
    friends = models.ManyToManyField(
        to=User,
        blank=True,
        related_name='friends'
    )

class FriendRequest(models.Model):
    sender = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name='sender'
    )
    receiver = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name='receiver'
    )
    is_active = models.BooleanField(blank=True, null=False, default=True)

    def accept(self):
        receiver_friend_list = FriendList.objects.get(user=self.receiver)
        if receiver_friend_list:
            receiver_friend_list.add_friend(self.sender)
            sender_friend_list = FriendList.objects.get(user=self.sender)
            if sender_friend_list:
                sender_friend_list.add_friend(self.receiver)
                self.is_active = False
                self.save()

    def decline(self):
        self.is_active = False
        self.save()

    def cancel(self):
        self.is_active = False
        self.save()