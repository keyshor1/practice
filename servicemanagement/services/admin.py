from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.Profile)
admin.site.register(models.Services)
admin.site.register(models.Staff)
admin.site.register(models.Booking)