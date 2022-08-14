
from email.policy import default
from django.db import models
from django.contrib.auth.models import User
from colorfield.fields import ColorField


class UserProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
        )
    image =  models.ImageField(upload_to="profile_images/",default="default/default_profile.jpg")
    description = models.CharField(max_length=5000,null=True)
    backgroundColor = ColorField(default="#0000aa")
    secondaryColor = ColorField(default="#ffffff")
    # profile_img = models.ImageField(upload_to="images/profile",default="/images/profile/witam/default.JPG")
    # background_img = models.ImageField(upload_to="images/profile/background",default="/images/profile/background/default.JPG")

    def __str__(self):
        return "Profile(" + str(self.id) +") of: "+self.user.username
