from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    # Mit lássunk a listában
    list_display = ('id', 'car', 'user', 'start_date', 'end_date', 'total_price', 'status', 'created_at')
    
    # Mi alapján szűrhessünk
    list_filter = ('status', 'payment_method', 'created_at')
    
    # Miben kereshessünk
    search_fields = ('user__email', 'billing_last_name', 'car__brand', 'car__license_plate')
    readonly_fields = ('total_price', 'deposit_amount', 'created_at')
    
    fieldsets = (
        ('Alapadatok', {
            'fields': ('user', 'car', 'status', 'created_at')
        }),
        ('Időtartam', {
            'fields': ('start_date', 'end_date')
        }),
        ('Pénzügy', {
            'fields': ('total_price', 'deposit_amount', 'payment_method')
        }),
        ('Számlázási Adatok', {
            'fields': ('billing_last_name', 'billing_first_name', 'billing_address')
        }),
    )