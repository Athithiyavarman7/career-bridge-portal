from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User,Application,Company,Jobs

admin.site.register(User,UserAdmin)
admin.site.register(Application)
admin.site.register(Company)
admin.site.register(Jobs)