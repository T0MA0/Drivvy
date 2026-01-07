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
from django.http import HttpResponse # <--- Fontos import!

# --- DEBUG FÜGGVÉNY KEZDETE ---
def debug_url_list(request):
    from django.urls import get_resolver
    # Lekéri az összes betöltött URL mintát
    patterns = get_resolver().url_patterns
    
    html = "<h1>A szerver által ismert URL-ek:</h1><ul>"
    for p in patterns:
        html += f"<li style='font-family: monospace; font-size: 16px; margin-bottom: 5px;'>{p}</li>"
    html += "</ul>"
    
    return HttpResponse(html)
# --- DEBUG FÜGGVÉNY VÉGE ---

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Ezt a sort add hozzá a teszthez:
    path('debug-urls/', debug_url_list), 

    # Az eredeti soraid
    path('api/token/', include('rest_framework.urls')), # Ha van ilyen
    # ... többi token végpont ...
    path('api/cars/', include('apps.cars.urls')),
]