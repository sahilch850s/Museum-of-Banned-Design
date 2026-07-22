from django.contrib import admin
from .models import Exhibit

@admin.register(Exhibit)
class ExhibitAdmin(admin.ModelAdmin):
    list_display = ('title', 'gallery', 'ban_category', 'year_banned', 'is_featured')
    list_filter = ('gallery', 'ban_category', 'is_featured')
    search_fields = ('title', 'designer_or_creator', 'summary')
    prepopulated_fields = {'slug': ('title',)}