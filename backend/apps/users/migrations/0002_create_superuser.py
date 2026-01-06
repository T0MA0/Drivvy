from django.db import migrations
from django.contrib.auth.hashers import make_password

def create_admin(apps, schema_editor):
    User = apps.get_model('users', 'CustomUser')

    email = "admin@drivvy.com"
    password = "mezeskalacs"
    first_name = "Admin"   
    last_name = "Admin"

    if not User.objects.filter(email=email).exists():
        print(f"Creating superuser: {email}")
        User.objects.create(
            email=email,
            password=make_password(password),
            first_name=first_name,
            last_name=last_name,
            is_superuser=True,
            is_staff=True,
            is_active=True,
            is_verified=True 
        )
    else:
        print("Superuser already exists")

class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_admin),
    ]