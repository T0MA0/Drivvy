from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Létrehoz egy superusert, ha még nem létezik'

    def handle(self, *args, **options):
        User = get_user_model()
        
        email = "admin@drivvy.com"
        password = "mezeskalacs"
        
        if not User.objects.filter(email=email).exists():
            self.stdout.write(f"Superuser létrehozása: {email}...")
            
            User.objects.create_superuser(
                email=email,
                password=password,
                first_name="Admin",  
                last_name="Boss",    
                is_active=True,
                is_staff=True,
                is_superuser=True,
                is_verified=True     
            )
            self.stdout.write(self.style.SUCCESS('Sikeresen létrehozva!'))
        else:
            self.stdout.write(self.style.WARNING('Ez a felhasználó már létezik.'))