from rest_framework import generics

from rest_framework.filters import OrderingFilter 
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Car
from .serializers import CarSerializer
from .filters import CarFilter
from apps.bookings.models import Booking

class CarListAPIView(generics.ListAPIView):
    serializer_class = CarSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = CarFilter

    # Rendezési beállítások (hogy működjön a ?ordering=price_per_day)
    ordering_fields = ['price_per_day', 'year', 'created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = Car.objects.filter(is_available=True)       # Elérhető járművek mutatása

        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')

        if start_date and end_date:
            # Megkeressük azokat az autókat, amik FOGLALTAK ebben az időszakban
            booked_car_ids = Booking.objects.filter(
                start_date__lt=end_date,
                end_date__gt=start_date,
                status__in=['confirmed', 'pending_payment','completed']
            ).values_list('car_id', flat=True)

            queryset = queryset.exclude(id__in=booked_car_ids)

            if booked_car_ids:
                    queryset = queryset.exclude(id__in=booked_car_ids)

        return queryset