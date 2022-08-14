
from rest_framework import serializers

from django.contrib.auth.models import User
from chat.models import Message,ChatRoom
from user_profile.serializers import UserWithProfileSerialzier

class MessageSerializer(serializers.ModelSerializer):
    author = UserWithProfileSerialzier()
    class Meta:
        model= Message
        fields = ['content','author','timestamp','room']
    
class NewMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model= Message
        fields = ['content','author','timestamp','room']
class ChatRoomSerializer(serializers.ModelSerializer):
    creator = UserWithProfileSerialzier
    class Meta:
        model = ChatRoom
        fields = ['id','name','creator','last_meesage','members']

    def create(self,validated_data):
        room = super().create(validated_data)
        # request = self.context.get('request', None)
        # if request:
        #     user = request.user
        #     room.creator = user
        #     room.members.add(room.creator)
        room.members.add(room.creator)
        return room

