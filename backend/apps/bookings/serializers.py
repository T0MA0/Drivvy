from rest_framework import serializers
from django.utils import timezone
from .models import Booking
from apps.cars.models import Car 

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            'id', 'car', 'start_date', 'end_date', 
            'billing_last_name', 'billing_first_name', 'billing_address', 
            'payment_method', 'total_price', 'deposit_amount', 'status', 'created_at'
        ]
        read_only_fields = ['id', 'total_price', 'deposit_amount', 'status', 'created_at']

    def validate(self, data):
        """
        Itt ellenőrizzük az üzleti szabályokat (Dátumok, Ütközés)
        """
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        car = data.get('car')

        # Dátum sorrend
        if start_date and end_date and start_date >= end_date:
            raise serializers.ValidationError({"end_date": "A visszaadás dátumának később kell lennie, mint az átvételnek."})

        # Múltbeli dátum tiltása
        if start_date and start_date < timezone.now().date():
             raise serializers.ValidationError({"start_date": "Nem foglalhatsz a múltban."})

        # ÜTKÖZÉS ELLENŐRZÉSE
        overlapping_bookings = Booking.objects.filter(
            car=car,
            start_date__lt=end_date,  
            end_date__gt=start_date,  
        ).exclude(status='cancelled')

        if overlapping_bookings.exists():
            raise serializers.ValidationError({"non_field_errors": ["Sajnos ez az autó ebben az időszakban már foglalt. Kérlek válassz más dátumot!"]})

        return data