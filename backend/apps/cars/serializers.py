from rest_framework import serializers
from .models import Car  # Feltételezem, hogy a modeled neve 'Car'

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'