from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend # <--- ÚJ IMPORT
from .models import Car
from .serializers import CarListSerializer
from .filters import CarFilter # <--- ÚJ IMPORT

class CarListView(generics.ListAPIView):
    queryset = Car.objects.all().order_by('-created_at')
    serializer_class = CarListSerializer
    permission_classes = [permissions.AllowAny]
    
    # === SZŰRÉS ÉS RENDEZÉS BEKAPCSOLÁSA ===
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    
    # 1. Melyik Filter osztályt használjuk?
    filterset_class = CarFilter
    
    # 2. Mi alapján lehessen rendezni? (A legördülő menühöz)
    ordering_fields = ['price_per_day', 'created_at', 'year']
    # alapértelmezett rendezés: legújabb elöl
    ordering = ['-created_at'] 
    
    # 3. Szabadszavas keresés (ha a SearchBarba írnak)
    search_fields = ['brand', 'model', 'description']