from urllib import request
from django.shortcuts import get_object_or_404, render
from chat.models import ChatRoom, Message
from chat.serializers import ChatRoomSerializer,MessageSerializer
from rest_framework import parsers,generics, permissions, pagination,decorators,viewsets
from rest_framework.mixins import UpdateModelMixin, DestroyModelMixin
from rest_framework.views import APIView
from rest_framework.response import Response


class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 15
    page_size_query_param = 'page_size'
    max_page_size = 15

    def get_paginated_response(self, data):
        next = self.page.number + 1
        if(self.get_next_link()==None):
            next = None
        context = {
            'next': next,
            'count': self.page.paginator.count,
            'results': data,
        }
        return Response(context)


class ChatRoomViewSet(viewsets.ModelViewSet):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer
    pagination_class = StandardResultsSetPagination

    def paginate_queryset(self, queryset):
        if self.paginator and self.request.query_params.get(self.paginator.page_query_param, None) is None:
            return None
        return super().paginate_queryset(queryset)
  

class MessagesViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    pagination_class = StandardResultsSetPagination