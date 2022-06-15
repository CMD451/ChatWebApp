from rest_framework.routers import DefaultRouter
from django.urls import path,include
from chat.api import MessagesViewSet,ChatRoomViewSet

router = DefaultRouter()
router.register(r'room',ChatRoomViewSet)
router.register(r'message',MessagesViewSet)

urlpatterns = [
    path('', include(router.urls))
]
