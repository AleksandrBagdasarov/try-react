import uuid
import random
import string
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The email Error")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True")

        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):

    id = models.UUIDField(primary_key=True, null=False, default=uuid.uuid4)
    email = models.EmailField(max_length=100, unique=True)
    USERNAME_FIELD = 'email'

    objects = UserManager()

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"


def create_code():
    match = True
    while match:
        random_code = "".join([random.choice(string.ascii_letters) for _ in range(5)])
        match = UserLinks.objects.filter(code=random_code)
    return random_code


class UserLinks(models.Model):
    id = models.UUIDField(primary_key=True, null=False, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None, null=True)
    code = models.CharField(max_length=5, null=False, default=create_code)
    name = models.CharField(max_length=100, default="", null=True, blank=True)
    link = models.TextField(null=False)
    clicks = models.IntegerField(null=False, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'user_link'
        verbose_name_plural = 'user_links'