from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
from django.contrib.postgres.fields import ArrayField

# Create your models here.
def post_photos_upload_path(instance, filename):
    return '/'.join([
        'posts', 
        filename
    ])

class Post(models.Model):
    '''
    related_name is used as an alias to populate all tweets created by a user
    '''
    user = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name='posts'
    )
    
    body = models.TextField(max_length=300)
    photo = models.ImageField(blank=True, null=True, upload_to=post_photos_upload_path)
    like = ArrayField(models.CharField(max_length=50, blank=True, null=True), blank=True)
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(blank=True, null=True, default=None)
