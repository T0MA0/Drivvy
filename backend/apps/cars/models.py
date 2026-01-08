from django.db import models

class Car(models.Model):
    # --- OPCIÓK A SZŰRÉSHEZ  ---
    FUEL_CHOICES = (
        ('Benzin', 'Benzin'),
        ('Dízel', 'Dízel'),
        ('Elektromos', 'Elektromos'),
        ('Hibrid', 'Hibrid'),
    )
    
    TRANSMISSION_CHOICES = (
        ('Manuális', 'Manuális'),
        ('Automata', 'Automata'),
    )

    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    license_plate = models.CharField(max_length=20, blank=True, null=True)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=0)
    is_available = models.BooleanField(default=True)
    image = models.ImageField(upload_to='cars/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    fuel_type = models.CharField(
        max_length=20, 
        choices=FUEL_CHOICES, 
        default='Benzin' 
    )
    transmission = models.CharField(
        max_length=20, 
        choices=TRANSMISSION_CHOICES, 
        default='Manuális'
    )

    def __str__(self):
        return f"{self.brand} {self.model} ({self.year})"