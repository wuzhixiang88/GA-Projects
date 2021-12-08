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
    user = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name='posts'
    )
    body = models.TextField(max_length=300)
    photo = models.ImageField(blank=True, null=True, upload_to=post_photos_upload_path)
    like = ArrayField(models.CharField(max_length=50, blank=True, null=True), blank=True, default=list)
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(blank=True, null=True, default=None)

class Comment(models.Model):
    user = models.ForeignKey(
        to=User, 
        on_delete=models.CASCADE
    )
    body = models.TextField(max_length=300)
    post = models.ForeignKey(
        to=Post,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    like = ArrayField(models.CharField(max_length=50, blank=True, null=True), blank=True, default=list)
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(blank=True, null=True, default=None)

class Reply(models.Model):
    user = models.ForeignKey(
        to=User, 
        on_delete=models.CASCADE
    )
    body = models.TextField(max_length=300)
    comment = models.ForeignKey(
        to=Comment,
        on_delete=models.CASCADE,
        related_name='replies'
    )
    like = ArrayField(models.CharField(max_length=50, blank=True, null=True), blank=True, default=list)
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(blank=True, null=True, default=None)
