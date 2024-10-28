'''Use this for development'''

from .base import *

ALLOWED_HOSTS += ['localhost', '127.0.0.1']
DEBUG = True

WSGI_APPLICATION = 'home.wsgi.dev.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
    'http://localhost:3001',  # Include this if your frontend runs on port 3001
)

CORS_ALLOW_CREDENTIALS = True  # Allow cookies to be included in cross-origin requests

# Stripe settings
STRIPE_PUBLIC_KEY = config('STRIPE_TEST_PUBLIC_KEY')
STRIPE_SECRET_KEY = config('STRIPE_TEST_SECRET_KEY')

