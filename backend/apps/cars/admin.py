from django.contrib import admin
from .models import Car

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('brand', 'model', 'year', 'fuel_type', 'transmission', 'price_per_day', 'is_available')
    list_filter = ('fuel_type', 'transmission', 'brand')
    search_fields = ('brand', 'model')