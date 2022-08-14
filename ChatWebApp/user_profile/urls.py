from rest_framework.routers import DefaultRouter
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from user_profile.api import ProfileDetailView,UserSearch,UserRegisterView,ProfileImageUploadView

urlpatterns = [
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('',ProfileDetailView.as_view(),name="currentUser"),
    path('image/',ProfileImageUploadView.as_view(),name="imageUpload"),
    path('register/',UserRegisterView.as_view(),name="registration"),
    path('search/',UserSearch.as_view(),name="searchForUser"),
]
