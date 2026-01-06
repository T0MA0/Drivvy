from django.db import migrations
import os

def create_superuser(apps, schema_editor):
    User = apps.get_model('users', 'User')  

    email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@drivvy.com')
    password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'Jelszo123')

    if not User.objects.filter(email=email).exists():
        print(f"Superuser létrehozása: {email}")
        User.objects.create_superuser(
            email=email,
            password=password,
            is_staff=True,
            is_superuser=True,
            is_active=True
        )
    else:
        print("A superuser már létezik.")

class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_superuser),
    ]