
from rest_framework import serializers

from django.contrib.auth.models import User
from chat.models import Message,ChatRoom

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model=Message
        fields = '__all__'

class ChatRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ['id','name','creator','last_meesage','members']

    def create(self,validated_data):
        room = super().create(validated_data)
        room.members.add(room.creator)
        return room

