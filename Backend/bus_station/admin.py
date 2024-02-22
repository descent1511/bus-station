from django.contrib import admin
from .models import Driver, Bus,  Route, Assignment, Breakdown
admin.site.register(Driver)

admin.site.register(Bus)

admin.site.register(Route)
admin.site.register(Assignment)
admin.site.register(Breakdown)
