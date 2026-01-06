

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cars', '0002_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField(verbose_name='Kezdés dátuma')),
                ('end_date', models.DateField(verbose_name='Vége dátuma')),
                ('billing_last_name', models.CharField(max_length=100, verbose_name='Számlázási Vezetéknév')),
                ('billing_first_name', models.CharField(max_length=100, verbose_name='Számlázási Keresztnév')),
                ('billing_address', models.CharField(max_length=255, verbose_name='Számlázási Cím')),
                ('payment_method', models.CharField(choices=[('card', 'Bankkártyás fizetés'), ('transfer', 'Banki átutalás (előre)')], default='card', max_length=20, verbose_name='Fizetési mód')),
                ('total_price', models.DecimalField(decimal_places=0, max_digits=10, verbose_name='Végösszeg (HUF)')),
                ('deposit_amount', models.DecimalField(decimal_places=0, default=50000, max_digits=10, verbose_name='Kaució (HUF)')),
                ('status', models.CharField(choices=[('pending_payment', 'Fizetésre vár'), ('confirmed', 'Visszaigazolva'), ('completed', 'Teljesítve'), ('cancelled', 'Lemondva')], default='pending_payment', max_length=20, verbose_name='Státusz')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookings', to='cars.car')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookings', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Foglalás',
                'verbose_name_plural': 'Foglalások',
            },
        ),
    ]
