from rest_framework import generics, permissions
from .models import Booking
from .serializers import BookingSerializer

class BookingListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    # LISTÁZÁS: A felhasználó csak a SAJÁT foglalásait láthatja
    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user).order_by('-created_at')

    # LÉTREHOZÁS: Itt számoljuk ki az árat mentés előtt
    def perform_create(self, serializer):
        car = serializer.validated_data['car']
        start_date = serializer.validated_data['start_date']
        end_date = serializer.validated_data['end_date']
        
        # Napok számolása
        days = (end_date - start_date).days
        if days < 1: days = 1
        
        # Árkalkuláció: Napok * Autó napi díja
        calculated_total_price = days * car.price_per_day
        
        # Kaució
        calculated_deposit = 50000 

        # Mentés az adatbázisba (a user-t és az árakat mi adjuk hozzá)
        serializer.save(
            user=self.request.user,
            total_price=calculated_total_price,
            deposit_amount=calculated_deposit,
            status='pending_payment'
        )