from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse # Debug-hoz kell

# Token és View importálása
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# Feltételezzük, hogy ez az import helyes (ha nem, a szerver 500-as hibát dob)
from apps.users.views import RegisterView, UserProfileView

# --- DEBUG FÜGGVÉNY (Ezzel ellenőrizzük a betöltött utakat) ---
def debug_url_list(request):
    from django.urls import get_resolver
    patterns = get_resolver().url_patterns
    html = "<h1>A szerver által ismert URL-ek:</h1><ul>"
    for p in patterns:
        html += f"<li style='font-family: monospace; font-size: 16px; margin-bottom: 5px;'>{p}</li>"
    html += "</ul>"
    return HttpResponse(html)
# -----------------------------------------------------------

urlpatterns = [
    path('admin/', admin.site.urls),
    path('debug-urls/', debug_url_list),

    # === API VÉGPONTOK (Auth) ===
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/profile/', UserProfileView.as_view(), name='profile'),

    
    path('api/cars/', include('apps.cars.urls')),
]

# Képek kiszolgálása (Csak fejlesztés alatt)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)