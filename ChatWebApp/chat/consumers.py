
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from chat.serializers import MessageSerializer
from user_profile.serializers import ProfileSerializer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_pk = self.scope['url_route']['kwargs']['pk']
        self.room_group_name = 'chat_room_%s' % self.room_pk
        self.user = self.scope["user"]

        if(self.user == None):
             self.close()

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        json_data = json.loads(text_data)
        message = json_data['message']
        print(self.scope['user'])
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type' : 'chat_message',
                'message': message
            }
        )
        await self.postMessage(message)

 
    async def chat_message(self, event):
        message = event['message']
        author = await self.getUserProfileInJson()
        message['author'] = author
        await self.send(text_data=json.dumps({
            'message': message
        }))

    @database_sync_to_async
    def getUserProfileInJson(self):
        return ProfileSerializer(self.user.profile).data

    @database_sync_to_async
    def postMessage(self,messageJson):
        return 
        # #todo
        # #make authentication required
        # # author = self.scope["user"].pk
        # room = self.room_pk

        # #change to serializer
        # print(messageJson)
   

  

    