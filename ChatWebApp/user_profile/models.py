
from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
        )
    description = models.CharField(max_length=5000,null=True)
    # profile_img = models.ImageField(upload_to="images/profile",default="/images/profile/witam/default.JPG")
    # background_img = models.ImageField(upload_to="images/profile/background",default="/images/profile/background/default.JPG")

    def __str__(self):
        return "Profile(" + str(self.id) +") of: "+self.user.username