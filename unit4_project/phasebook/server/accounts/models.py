from django.db import models
from django.contrib.auth.models import User

# Create your models here.
def cover_photos_upload_path(instance, filename):
    return '/'.join([
        str(f"{instance.user.first_name}.{instance.user.last_name}.{instance.user.id}"), 
        'covers', 
        filename
    ])

def profile_photos_upload_path(instance, filename):
    return '/'.join([
        str(f"{instance.user.first_name}.{instance.user.last_name}.{instance.user.id}"), 
        'profiles', 
        filename
    ])

class UserProfile(models.Model):
    user = models.OneToOneField(
        to=User,
        on_delete=models.CASCADE
    )

    cover_photo = models.ImageField(blank=True, null=True, upload_to=cover_photos_upload_path)
    profile_photo = models.ImageField(blank=True, null=True, upload_to=profile_photos_upload_path )
