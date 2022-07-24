from django.db import models
from django.contrib.auth.models import User

class Menu(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200)
    price = models.FloatField()
    image = models.ImageField()