from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .models import Car
from .serializers import CarSerializer
from .filters import CarFilter

class CarListAPIView(generics.ListAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    
    filterset_class = CarFilter
    
    ordering_fields = ['price_per_day', 'created_at', 'year']
    
    ordering = ['-created_at']