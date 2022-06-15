
from dataclasses import fields
from rest_framework import serializers
from user_profile.models import UserProfile
from django.contrib.auth.models import User

class BaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = [
            "id",
            "username",
            "email"
        ]
class UserProfileSerializer(serializers.ModelSerializer):
    user = BaseUserSerializer()
    class Meta:
        model = UserProfile
        fields = '__all__'

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
        'username',
        'email',
        'password'
        ]




