from rest_framework import routers
from backend.api import UserBasicAuthView, LinksCreateRetrieveView, LinkDeleteView
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

# router = routers.DefaultRouter()
# router.register("links", UserLinksViewSet)
#

urlpatterns = [
    path('register', UserBasicAuthView.as_view(), name="register"),
    path('links', LinksCreateRetrieveView.as_view(), name="links"),
    path('links/<str:id>', LinkDeleteView.as_view()),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]