from asyncio import constants
from urllib import request
from django.shortcuts import get_object_or_404, render
from chat.models import ChatRoom, Message
from chat.serializers import ChatRoomSerializer,MessageSerializer,GetChatRoomSerializer
from rest_framework import parsers,generics, permissions, pagination,decorators,viewsets
from rest_framework.generics import RetrieveUpdateDestroyAPIView,ListAPIView
from rest_framework.permissions import IsAuthenticated
from chat.paginators import StandardResultsSetPagination
from chat.permissions import IsMessegeOwner,HasAccesToRoom
from rest_framework.response import Response


class ChatRoomViewSet(viewsets.ModelViewSet):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        try:
            if(self.action == "list"):
                return GetChatRoomSerializer
        except:
            pass
        return super(ChatRoomViewSet, self).get_serializer_class()

    def paginate_queryset(self, queryset):
        if self.paginator and self.request.query_params.get(self.paginator.page_query_param, None) is None:
            return None
        return super().paginate_queryset(queryset)

    def get_queryset(self):
        return self.request.user.rooms.all()
        
  

class MessageDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsMessegeOwner,IsAuthenticated]

class MessageListView(ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [HasAccesToRoom,IsAuthenticated]

    def get_queryset(self):
        _id = self.request.GET.get('id')
        room = ChatRoom.objects.filter(id=_id).get()
        if not room:
            return []
        return room.messages.all()
    
         
    
