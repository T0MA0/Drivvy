'''
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

# Token és View importálása
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from apps.users.views import RegisterView, UserProfileView

urlpatterns = [
    path('admin/', admin.site.urls),

    # === API VÉGPONTOK ===
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/profile/', UserProfileView.as_view(), name='profile'),
    path('api/cars/', include('apps.cars.urls')),
]

# Képek kiszolgálása
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
'''
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse # <--- Ezt add hozzá

# 1. DIAGNOSZTIKAI FÜGGVÉNY (Közvetlenül ide írva)
def system_check(request):
    return JsonResponse({
        "status": "Működik",
        "location": "Ez a válasz közvetlenül a drivvy/urls.py-ból jön",
        "next_step": "Ha ezt látod, a szerver fut, a hiba az include-ban van."
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # 2. TESZT VÉGPONT
    path('api/system-check/', system_check),

    # A te eredeti soraid
    path('api/cars/', include('apps.cars.urls')), 
    # Ha nincs apps mappád, próbáld meg így is egy sorral lejjebb kikommentelve:
    # path('api/cars-test/', include('cars.urls')), 
]