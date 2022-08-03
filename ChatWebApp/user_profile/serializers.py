
from dataclasses import fields
from wsgiref.validate import validator
from rest_framework import serializers
from user_profile.models import UserProfile
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
import django.contrib.auth.password_validation as validators
from django.core import exceptions
from user_profile.models import *

class BaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = [
            "id",
            "username",
            "email"
        ]

class ProfileSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True,required=False)
    class Meta:
        model=UserProfile
        fields = '__all__'

class UserWithProfileSerialzier(serializers.ModelSerializer):
    profile = ProfileSerializer()
    class Meta:
        model=User
        fields = ['id','username','email','profile']
        
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
        except exceptions.ValidationError as e:
            raise serializers.ValidationError({'password':list(e.messages)[0]}) 
        return super(UserRegisterSerializer, self).validate(data)

    def save(self,**kwargs):
        instance = super(UserRegisterSerializer,self).save(**kwargs)
        UserProfile.objects.create(user=instance)
        return instance
        
        
        




