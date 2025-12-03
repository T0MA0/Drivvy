from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Ez kezeli a regisztrációt: veszi az emailt/jelszót és létrehozza a usert.
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        return user

class UserDetailSerializer(serializers.ModelSerializer):
    """
    Ez küldi vissza az adatokat a profil oldalnak (React).
    """
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'is_verified', 'phone', 'zip_code', 'address')