from django.db import models
from django.conf import settings

class Booking(models.Model):
    PAYMENT_METHOD_CHOICES = (
        ('card', 'Bankkártyás fizetés'),
        ('transfer', 'Banki átutalás (előre)'),
    )

    STATUS_CHOICES = (
        ('pending_payment', 'Fizetésre vár'), 
        ('confirmed', 'Visszaigazolva'),       
        ('completed', 'Teljesítve'),        
        ('cancelled', 'Lemondva'),
    )

    # --- KAPCSOLATOK ---
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
    car = models.ForeignKey('cars.Car', on_delete=models.CASCADE, related_name='bookings')

    start_date = models.DateField(verbose_name="Kezdés dátuma") # "Mikortól?"
    end_date = models.DateField(verbose_name="Vége dátuma")     # "Meddig?"

    billing_last_name = models.CharField(max_length=100, verbose_name="Számlázási Vezetéknév")
    billing_first_name = models.CharField(max_length=100, verbose_name="Számlázási Keresztnév")
    billing_address = models.CharField(max_length=255, verbose_name="Számlázási Cím")

    payment_method = models.CharField(
        max_length=20, 
        choices=PAYMENT_METHOD_CHOICES, 
        default='card', 
        verbose_name="Fizetési mód"
    )
    
    # A "Foglalás Összefoglaló" doboz adatai
    total_price = models.DecimalField(max_digits=10, decimal_places=0, verbose_name="Végösszeg (HUF)")
    deposit_amount = models.DecimalField(max_digits=10, decimal_places=0, default=50000, verbose_name="Kaució (HUF)")

    # --- EGYÉB ---
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending_payment', verbose_name="Státusz")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.car} ({self.start_date} - {self.end_date})"

    class Meta:
        verbose_name = "Foglalás"
        verbose_name_plural = "Foglalások"