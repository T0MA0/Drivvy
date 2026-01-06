

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('license_plate', models.CharField(max_length=8, unique=True, validators=[django.core.validators.RegexValidator(message='A rendszám formátuma: AAA-123 vagy AAAA-123 lehet.', regex='^([A-Z]{3}-\\d{3}|[A-Z]{4}-\\d{3})$')], verbose_name='Rendszám')),
                ('brand', models.CharField(max_length=20, verbose_name='Márka')),
                ('category', models.CharField(max_length=3, verbose_name='Kategória')),
                ('description', models.TextField(blank=True, max_length=256, verbose_name='Leírás')),
                ('drivetrain', models.CharField(max_length=20, verbose_name='Hajtáslánc')),
                ('production_date', models.DateField(verbose_name='Gyártás ideje')),
                ('consumption', models.CharField(blank=True, max_length=10, null=True, verbose_name='Fogyasztás')),
                ('technical_exam_date', models.DateField(verbose_name='Műszaki vizsga érvényessége')),
                ('price_per_day', models.DecimalField(decimal_places=0, max_digits=10, verbose_name='Napi bérleti díj')),
                ('insurance', models.CharField(blank=True, max_length=50, null=True, verbose_name='Extra biztosítás')),
                ('image', models.ImageField(upload_to='cars/', verbose_name='Autó képe')),
            ],
            options={
                'verbose_name': 'Autó',
                'verbose_name_plural': 'Autók',
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True, verbose_name='Kategória neve')),
                ('description', models.TextField(blank=True, verbose_name='Leírás')),
                ('image', models.ImageField(blank=True, null=True, upload_to='categories/', verbose_name='Kategória képe')),
            ],
            options={
                'verbose_name': 'Kategória',
                'verbose_name_plural': 'Kategóriák',
            },
        ),
    ]
