from rest_framework import serializers
from backend.models import UserLinks, User
from rest_framework.validators import UniqueValidator


class CreateLinksSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserLinks
        fields = "__all__"
        read_only_fields = ['id', "clicks", "code", "created_at"]


class RetrieveLinksSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserLinks
        fields = "__all__"


class UserBasicAuthSerializer(serializers.Serializer):
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(max_length=100, write_only=True, allow_blank=False, allow_null=False)


class UserAuthResponseSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    access = serializers.CharField()

