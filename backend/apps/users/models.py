from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):

    vezeteknev = models.CharField(max_length=100)
    keresztnev = models.CharField(max_length=100)
    telefon = models.CharField(max_length=20)
    szuletesi_datum = models.DateField(null=True, blank=True)
    lakcim = models.CharField(max_length=255, null=True, blank=True)
    profilkep = models.ImageField(upload_to='profiles/', null=True, blank=True)
    
    class Meta:
        db_table = 'felhasznalo'

    def __str__(self):
        return self.username