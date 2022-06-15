from rest_framework.routers import DefaultRouter
from django.urls import path,include
from chat.api import ChatRoomViewSet,MessageDetailView,MessageListView


router = DefaultRouter()
router.register(r'room',ChatRoomViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('messages/',MessageListView.as_view(),name="messageList"),
    path('messages/<int:pk>/',MessageDetailView.as_view(),name="messageDetail"),
]
