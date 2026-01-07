import django_filters
from .models import Car

class CarFilter(django_filters.FilterSet):
    # Lehetővé teszi, hogy több értéket válasszunk (pl. ?brand=Audi&brand=BMW)
    brand = django_filters.AllValuesMultipleFilter(field_name='brand')
    fuel_type = django_filters.AllValuesMultipleFilter(field_name='fuel_type')
    transmission = django_filters.AllValuesMultipleFilter(field_name='transmission')
    
    # Ár szerinti szűrés (tól-ig)
    min_price = django_filters.NumberFilter(field_name="price_per_day", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price_per_day", lookup_expr='lte')

    class Meta:
        model = Car
        fields = ['brand', 'fuel_type', 'transmission']