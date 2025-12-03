from django.core.management.base import BaseCommand
from cars.models import Car, Category
from django.contrib.auth import get_user_model
from django.utils import timezone
import random

User = get_user_model()

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        self.stdout.write('Adatok betöltése...')

        # Szerezzünk egy felhasználót (Admin)
        user = User.objects.first()
        if not user:
            self.stdout.write(self.style.ERROR('Nincs felhasználó! Előbb hozz létre egy superusert.'))
            return

        # Kategóriák létrehozása
        categories = ['Sedan', 'SUV', 'Kombi', 'Sport', 'Városi']
        cat_objects = {}
        for cat_name in categories:
            cat, created = Category.objects.get_or_create(name=cat_name)
            cat_objects[cat_name] = cat

        # Autók listája (Márka, Modell, Év, Ár, Kategória, Üzemanyag, Váltó)
        cars_data = [
            # AUDI
            ('Audi', 'A4', 2020, 18000, 'Sedan', 'Dízel', 'Automata'),
            ('Audi', 'Q7', 2022, 35000, 'SUV', 'Dízel', 'Automata'),
            
            # BMW
            ('BMW', '320d', 2019, 16500, 'Sedan', 'Dízel', 'Automata'),
            ('BMW', 'i3', 2021, 14000, 'Városi', 'Elektromos', 'Automata'),
            ('BMW', 'X5', 2023, 40000, 'SUV', 'Dízel', 'Automata'),

            # OPEL
            ('Opel', 'Astra', 2018, 9000, 'Kombi', 'Benzin', 'Manuális'),
            ('Opel', 'Corsa', 2020, 8500, 'Városi', 'Benzin', 'Manuális'),

            # SUZUKI
            ('Suzuki', 'Swift', 2022, 8000, 'Városi', 'Hibrid', 'Manuális'),
            ('Suzuki', 'Vitara', 2021, 11000, 'SUV', 'Benzin', 'Automata'),

            # VOLKSWAGEN
            ('Volkswagen', 'Golf 8', 2021, 13000, 'Városi', 'Benzin', 'Manuális'),
            ('Volkswagen', 'Passat', 2020, 15000, 'Kombi', 'Dízel', 'Automata'),
            
            # EGYÉB
            ('Mercedes', 'C-Class', 2022, 22000, 'Sedan', 'Dízel', 'Automata'),
            ('Tesla', 'Model 3', 2023, 25000, 'Sport', 'Elektromos', 'Automata'),
        ]

        # Autók létrehozása az adatbázisban
        for brand, model, year, price, cat_name, fuel, trans in cars_data:
            # Ellenőrizzük, létezik-e már, hogy ne duplázzunk
            if not Car.objects.filter(license_plate=f"{brand[:3]}-{year}").exists():
                Car.objects.create(
                    owner=user,
                    category=cat_objects[cat_name],
                    brand=brand,
                    model=model,
                    year=year,
                    fuel_type=fuel,
                    transmission=trans,
                    price_per_day=price,
                    deposit=50000,
                    description=f"Egy remek {brand} {model}, tökéletes állapotban. {fuel} üzemű, {trans} váltóval.",
                    # Egyedi rendszám generálása
                    license_plate=f"{brand[:3].upper()}-{random.randint(100,999)}",
                    created_at=timezone.now()
                )
                self.stdout.write(f"Hozzáadva: {brand} {model}")

        self.stdout.write(self.style.SUCCESS('SIKER! Minden autó betöltve.'))