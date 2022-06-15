from rest_framework.routers import DefaultRouter
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from user_profile.api import ProfileDetailView,UserSearch

urlpatterns = [
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('',ProfileDetailView.as_view(),name="currentUser"),
    path('search/',UserSearch.as_view(),name="searchForUser"),
]
