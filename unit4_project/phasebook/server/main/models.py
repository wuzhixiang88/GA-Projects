from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

# Create your models here.
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
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(null=True, default=None)
