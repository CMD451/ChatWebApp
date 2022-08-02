from django.db.models.signals import post_save
from django.dispatch import receiver
from user_profile.models import UserProfile
from django.contrib.auth.models import User

@receiver(post_save, sender=User)
def create_userProfile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)