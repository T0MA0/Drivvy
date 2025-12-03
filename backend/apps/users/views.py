from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer, UserDetailSerializer

# Regisztrációs nézet
class RegisterView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny] # Bárki regisztrálhat (nem kell belépve lenni)

# Profil lekérdezése (a bejelentkezett felhasználónak)
class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated] # Csak belépve érhető el

    def get(self, request):
        serializer = UserDetailSerializer(request.user)
        return Response(serializer.data)