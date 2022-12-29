from rest_framework import views, permissions, generics, response, status
from drf_yasg.utils import swagger_auto_schema
from backend.models import UserLinks, User, UserManager
from django.http import HttpResponseRedirect
from backend.serializers import CreateLinksSerializer, RetrieveLinksSerializer, UserBasicAuthSerializer, UserAuthResponseSerializer
from rest_framework_simplejwt.tokens import (
    RefreshToken,
)


class RedirectToLinkView(views.APIView):

    def get(self, request, *args, **kwargs):
        code = kwargs.get("code")
        user_links = UserLinks.objects.filter(code=code)
        if user_links:
            user_link = user_links[0]
            user_link.clicks += 1
            user_link.save()
            return HttpResponseRedirect(user_link.link)
        else:
            return HttpResponseRedirect("http://127.0.0.1:8000")


class LinksCreateRetrieveView(generics.GenericAPIView):
    queryset = UserLinks.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CreateLinksSerializer

    @swagger_auto_schema(responses={
        status.HTTP_200_OK: RetrieveLinksSerializer()
    })
    def post(self, request, *args, **kwargs):
        payload = request.data

        if request.auth:
            user_id = request.user.id
            payload["user"] = user_id

        serializer = self.get_serializer(data=payload)
        serializer.is_valid()
        user_links_object = serializer.create(serializer.validated_data)
        result = RetrieveLinksSerializer(user_links_object)
        return response.Response(data=result.data)

    @swagger_auto_schema(responses={
        status.HTTP_200_OK: RetrieveLinksSerializer(many=True)
    })
    def get(self, request, *args, **kwargs):
        user_links = UserLinks.objects.filter(user=request.user)
        serializer = RetrieveLinksSerializer(user_links, many=True)

        return response.Response(serializer.data)


class LinkDeleteView(views.APIView):

    # queryset = UserLinks.objects.all()
    # permission_classes = [
    #     permissions.AllowAny
    # ]

    def delete(self, request, *args, **kwargs):
        link = UserLinks.objects.filter(user=request.user, id=kwargs["id"])
        if link:
            link.delete()
        return response.Response({}, status=status.HTTP_204_NO_CONTENT)


class UserBasicAuthView(generics.GenericAPIView):
    serializer_class = UserBasicAuthSerializer

    @swagger_auto_schema(responses={
        status.HTTP_200_OK: UserAuthResponseSerializer()
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = User.objects.create_user(
            email=serializer.validated_data["email"],
            password=serializer.validated_data["password"],
        )
        refresh = RefreshToken.for_user(user)
        return response.Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }, status=status.HTTP_200_OK)




