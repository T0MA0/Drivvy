from django.db import models
from django.conf import settings
from django.core.validators import RegexValidator

# === KATEGÓRIA TÁBLA ===
class Category(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name="Kategória neve")
    description = models.TextField(blank=True, verbose_name="Leírás")
    image = models.ImageField(upload_to='categories/', null=True, blank=True, verbose_name="Kategória képe")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Kategória"
        verbose_name_plural = "Kategóriák"


# === AUTÓ TÁBLA ===
class Car(models.Model):
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

    # Kapcsolatok
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cars')
    # Itt hivatkozunk a fenti Category osztályra
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='cars', verbose_name="Kategória")
    
    # Alapadatok
    brand = models.CharField(max_length=50, verbose_name="Márka") 
    model = models.CharField(max_length=50, verbose_name="Modell")
    year = models.IntegerField(default=2023, verbose_name="Évjárat")
    
    # Szűrhető tulajdonságok
    fuel_type = models.CharField(max_length=20, choices=FUEL_CHOICES, verbose_name="Üzemanyag")
    transmission = models.CharField(max_length=20, choices=TRANSMISSION_CHOICES, verbose_name="Váltó")
    
    # Technikai adatok
    drivetrain = models.CharField(max_length=20, blank=True, null=True, verbose_name="Hajtáslánc") # Pl. FWD, AWD
    consumption = models.CharField(max_length=10, null=True, blank=True, verbose_name="Fogyasztás")
    
    # Pénzügy
    price_per_day = models.DecimalField(max_digits=10, decimal_places=0, verbose_name="Napi ár (Ft)")
    deposit = models.DecimalField(max_digits=10, decimal_places=0, default=50000, verbose_name="Kaució (Ft)")
    
    # Egyéb
    description = models.TextField(blank=True, verbose_name="Leírás")
    image = models.ImageField(upload_to='cars/', verbose_name="Autó képe")
    license_plate = models.CharField(max_length=10, unique=True, verbose_name="Rendszám")
    
    # Validátor
    technical_exam_date = models.DateField(null=True, blank=True, verbose_name="Műszaki vizsga")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.brand} {self.model} ({self.license_plate})"

    class Meta:
        verbose_name = "Autó"
        verbose_name_plural = "Autók"