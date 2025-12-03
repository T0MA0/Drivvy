from django.contrib import admin
from .models import StripeCustomer, Payment

admin.site.register(StripeCustomer)
admin.site.register(Payment)