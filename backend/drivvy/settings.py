"""
Django settings for drivvy project.
"""
import os
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Ez teszi lehetővé, hogy a Django megtalálja az 'apps' mappában lévő fájlokat
sys.path.insert(0, os.path.join(BASE_DIR, 'apps'))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY','django-insecure-!i=c39n#uz-aaubiq3q=cfr%wh06(31$%wlt=d&8y@z3*xpohd')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG','True') == 'True'

# Railway hosztolás engedélyezése
ALLOWED_HOSTS = ['*']       

# Ez mondja meg a Djangónak, hogy bízzon a Railway HTTPS kapcsolatában
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SAMESITE = 'None'

X_FRAME_OPTIONS = 'ALLOWALL'

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Harmadik féltől származó appok
    'rest_framework',
    'corsheaders',
    'rest_framework_simplejwt',
    'django_filters',

    # Saját appok (az 'apps' mappából)
    'users',
    'cars',
    'bookings',
    'payments',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'drivvy.urls'

# Frontend engedélyezése
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://drivvy-carsharing.vercel.app"
]
CSRF_TRUSTED_ORIGINS = [
    'https://drivvy-production.up.railway.app',
    "https://drivvy-carsharing.vercel.app"
]


if not DEBUG:
    CORS_ALLOW_CREDENTIALS = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]




# === ADATBÁZIS KONFIGURÁCIÓ ===
print(f"DEBUG: DB_HOST értéke: '{os.environ.get('DB_HOST')}'")


DATABASES = {
    'default': {
        'ENGINE': 'mssql',
        'NAME': 'drivvy-db',
        'USER': 'aminoAdmino',
        'PASSWORD': 'Absolute345', 
        'HOST': 'drivvy-server.database.windows.net',
        'PORT': '',
        'OPTIONS': {
                'driver': 'ODBC Driver 18 for SQL Server',
                'TrustServerCertificate': 'yes',
        },
    }
}

WSGI_APPLICATION = 'drivvy.wsgi.application'

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
LANGUAGE_CODE = 'hu-hu' 
TIME_ZONE = 'Europe/Budapest'
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles') 
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# === KÉpek feltöltéséhez ===
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST API beállítások
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}

AUTH_USER_MODEL = 'users.CustomUser'