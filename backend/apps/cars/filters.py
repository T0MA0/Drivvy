import django_filters
from .models import Car

class CarFilter(django_filters.FilterSet):
    # Lehetővé tesszük, hogy több márkát is kiválasszanak egyszerre
    brand = django_filters.AllValuesMultipleFilter(field_name='brand')
    
    # Üzemanyag és váltó szűrés
    fuel_type = django_filters.MultipleChoiceFilter(choices=Car.FUEL_CHOICES)
    transmission = django_filters.MultipleChoiceFilter(choices=Car.TRANSMISSION_CHOICES)

    # Ár szerinti szűrés (tól-ig), ha később kellene
    min_price = django_filters.NumberFilter(field_name="price_per_day", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price_per_day", lookup_expr='lte')

    class Meta:
        model = Car
        fields = ['brand', 'fuel_type', 'transmission', 'year']