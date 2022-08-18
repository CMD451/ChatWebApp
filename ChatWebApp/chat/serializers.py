
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
class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ['id','username']
class GetChatRoomSerializer(serializers.ModelSerializer):
    members = MemberSerializer(many=True)
    creator = UserWithProfileSerialzier
    class Meta:
        model = ChatRoom
        fields = ['id','name','creator','last_meesage','members']
class ChatRoomSerializer(serializers.ModelSerializer):
    creator = UserWithProfileSerialzier
    class Meta:
        model = ChatRoom
        fields = ['id','name','creator','last_meesage','members']

    def create(self,validated_data):
        room = super().create(validated_data)
        room.members.add(room.creator)
        return room
    def get_members(self,obj):
        members_array = []
        for user in obj.members.filter():
            user_dict = {
                'username':user.username,
                'id':user.id
                }
            members_array.append(user_dict)
        return members_array

