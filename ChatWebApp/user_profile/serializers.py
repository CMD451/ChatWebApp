
from dataclasses import fields
from wsgiref.validate import validator
from rest_framework import serializers
from user_profile.models import UserProfile
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
import django.contrib.auth.password_validation as validators
from django.core.exceptions import ValidationError

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
    password = serializers.CharField(
        write_only=True,
        required=True,

    )
    class Meta:
        model = User
        fields = [
        'username',
        'email',
        'password'
        ]

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(UserRegisterSerializer, self).create(validated_data)

    def update(self,validated_data):
        if validated_data['password']:
            validated_data['password'] = make_password(validated_data.get('password'))
        return super(UserRegisterSerializer, self).update(validated_data)

    def validate(self, data):
        user = User(**data)
        password = data.get('password')
        try:
            validators.validate_password(password=password,user=user)
        except ValidationError as e:
            raise serializers.ValidationError({'password':list(e.messages)[0]}) 
        return super(UserRegisterSerializer, self).validate(data)







