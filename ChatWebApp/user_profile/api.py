
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateAPIView,ListAPIView,CreateAPIView
from rest_framework.mixins import CreateModelMixin,UpdateModelMixin
from chat.paginators import StandardResultsSetPagination
from user_profile.models import UserProfile
from user_profile.serializers import UserRegisterSerializer,UserWithProfileSerialzier,ProfileSerializer,ProfileImageSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView


class ProfileDetailView(RetrieveUpdateAPIView):
    serializer_class = UserWithProfileSerialzier
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        user = self.request.user
        return user
class ProfileImageUploadView(APIView,UpdateModelMixin):
    serializer_class = ProfileImageSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        return user.profile

        
class UserSearch(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserWithProfileSerialzier
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        if not self.request.GET.get('phrase'):
            return []
        phrase = self.request.GET.get('phrase')
        queryset = super().get_queryset()
        return queryset.filter(username__startswith=phrase)

class UserRegisterView(CreateAPIView):
    serializer_class = UserRegisterSerializer



        