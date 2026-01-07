
from rest_framework import generics
from rest_framework.response import Response
from django.db.models import Q
from .models import Car
from .serializers import CarSerializer # Feltételezem, hogy van serializer
from apps.bookings.models import Booking

class CarListAPIView(generics.ListAPIView):
    serializer_class = CarSerializer

    def get_queryset(self):
        # 1. Alapból vesszük az összes autót
        queryset = Car.objects.all()

        # 2. Dátum szűrés (A legfontosabb rész!)
        start_date = self.request.query_params.get('start_date') # pl: 2026-01-10
        end_date = self.request.query_params.get('end_date')     # pl: 2026-01-15

        if start_date and end_date:
            # Megkeressük azokat az autókat, amik FOGLALTAK ebben az időben
            # Logika: A foglalás kezdete előbb van, mint a kérés vége ÉS a foglalás vége később van, mint a kérés kezdete
            booked_car_ids = Booking.objects.filter(
                Q(start_date__lte=end_date) & Q(end_date__gte=start_date),
                status__in=['confirmed', 'pending_payment'] # Csak az éles foglalások számítanak
            ).values_list('car_id', flat=True)

            # KIZÁRJUK a foglaltakat a listából
            queryset = queryset.exclude(id__in=booked_car_ids)

        # 3. Bal oldali sáv szűrői (Márka, Kategória, Ár)
        brand = self.request.query_params.get('brand')
        category = self.request.query_params.get('category')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')

        if brand:
            queryset = queryset.filter(brand__iexact=brand)
        if category:
            queryset = queryset.filter(category__name__iexact=category)
        if min_price:
            queryset = queryset.filter(price_per_day__gte=min_price)
        if max_price:
            queryset = queryset.filter(price_per_day__lte=max_price)

        return queryset