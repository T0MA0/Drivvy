from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.core.validators import RegexValidator # Fontos import!

class CustomUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError('Az e-mail cím megadása kötelező!')
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_verified', True)
        return self.create_user(email, first_name, last_name, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    # === VALIDÁTOROK (Ezeknek a mezők előtt kell lenniük!) ===
    
    # 1. Telefonszám ellenőrző
    phone_validator = RegexValidator(
        regex=r'^\d{11}$', 
        message="A telefonszámnak 11 számjegyből kell állnia."
    )
    
    # 2. Irányítószám ellenőrző (EZ HIÁNYZOTT!)
    zip_validator = RegexValidator(
        regex=r'^\d{4}$', 
        message="Az irányítószám 4 számjegyű."
    )

    # === MEZŐK ===
    email = models.EmailField(unique=True, max_length=255, verbose_name="E-mail")
    first_name = models.CharField(max_length=32, verbose_name="Keresztnév")
    last_name = models.CharField(max_length=32, verbose_name="Vezetéknév")
    
    birth_date = models.DateField(null=True, blank=True, verbose_name="Születési dátum")
    
    # Itt használjuk a fenti validátort
    phone = models.CharField(max_length=11, null=True, blank=True, validators=[phone_validator], verbose_name="Telefonszám")
    
    # Itt használjuk a MOST MÁR LÉTEZŐ zip_validatort
    zip_code = models.CharField(max_length=4, null=True, blank=True, validators=[zip_validator], verbose_name="Irányítószám")
    
    address = models.CharField(max_length=50, null=True, blank=True, verbose_name="Lakcím")
    id_card_number = models.CharField(max_length=10, null=True, blank=True, verbose_name="Személyi ig. / Lakcímkártya szám")
    
    # Képek
    id_card_image_front = models.ImageField(upload_to='documents/id_cards/', null=True, blank=True, verbose_name="Személyi ig. előlap")
    id_card_image_back = models.ImageField(upload_to='documents/id_cards/', null=True, blank=True, verbose_name="Személyi ig. hátlap")
    
    is_verified = models.BooleanField(default=False, verbose_name="Hitelesített felhasználó")
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        status = "✅" if self.is_verified else "❌"
        return f"{self.last_name} {self.first_name} ({status})"

    class Meta:
        verbose_name = "Felhasználó"
        verbose_name_plural = "Felhasználók"


class DrivingLicense(models.Model):
    # Validátor a jogsihoz
    license_num_validator = RegexValidator(
        regex=r'^[A-Z]{2}\d{6}$', 
        message="A jogosítvány szám formátuma: 2 betű és 6 számjegy (pl. AB123456)."
    )

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='license')
    category = models.CharField(max_length=50, verbose_name="Kategória")
    issue_date = models.DateField(verbose_name="Kiállítás dátuma")
    expiry_date = models.DateField(verbose_name="Lejárat dátuma")
    
    license_number = models.CharField(
        max_length=8, 
        verbose_name="Jogosítvány szám",
        validators=[license_num_validator]
    )
    
    license_image_front = models.ImageField(upload_to='documents/licenses/', null=True, blank=True, verbose_name="Jogosítvány előlap")
    license_image_back = models.ImageField(upload_to='documents/licenses/', null=True, blank=True, verbose_name="Jogosítvány hátlap")

    def __str__(self):
        return f"{self.license_number} ({self.user})"