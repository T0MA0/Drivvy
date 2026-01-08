from rest_framework import generics
# Fontos: Az OrderingFilter-t importálni kell a rest_framework.filters-ből!
from rest_framework.filters import OrderingFilter 
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Car
from .serializers import CarSerializer
from .filters import CarFilter
from apps.bookings.models import Booking

class CarListAPIView(generics.ListAPIView):
    serializer_class = CarSerializer
    
    # --- Konfiguráció kiemelése ---
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = CarFilter
    
    # Rendezési beállítások (hogy működjön a ?ordering=price_per_day)
    ordering_fields = ['price_per_day', 'year', 'created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = Car.objects.all()

        # --- EGYEDI LOGIKA: Dátum elérhetőség ---
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')

        if start_date and end_date:
            # Megkeressük azokat az autókat, amik FOGLALTAK ebben az időszakban
            booked_car_ids = Booking.objects.filter(
                Q(start_date__lte=end_date) & Q(end_date__gte=start_date),
                status__in=['confirmed', 'pending_payment']
            ).values_list('car_id', flat=True)

            queryset = queryset.exclude(id__in=booked_car_ids)

        return queryset