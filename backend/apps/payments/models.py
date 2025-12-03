from django.db import models
from django.conf import settings

class StripeCustomer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='stripe_customer')
    stripe_customer_id = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Stripe ID: {self.stripe_customer_id} ({self.user})"

class Payment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Függőben'),
        ('completed', 'Sikeres'),
        ('failed', 'Sikertelen'),
        ('refunded', 'Visszatérítve'),
    )

    # Stringes hivatkozás a Bookingra, hogy elkerüljük a körkörös import hibát
    booking = models.ForeignKey('bookings.Booking', on_delete=models.CASCADE, related_name='payments')
    
    stripe_payment_intent_id = models.CharField(max_length=255, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=0, verbose_name="Összeg (HUF)")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.amount} HUF ({self.status})"