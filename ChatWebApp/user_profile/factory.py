from random import randint
from faker import Faker
import factory
fake = Faker()
from django.contrib.auth.models import User
from user_profile.models import UserProfile

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User
    username = factory.Sequence(lambda n: "user_%d" % n)
    password = factory.PostGenerationMethodCall('set_password', 'tobiasz123')
    is_staff = True
    is_superuser = True

class ProfileFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = UserProfile
    user = factory.SubFactory(UserFactory)
    description = fake.text()
