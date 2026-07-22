from rest_framework import serializers
from .models import Exhibit

class ExhibitListSerializer(serializers.ModelSerializer):
    gallery_name = serializers.CharField(source='gallery.title', read_only=True)

    class Meta:
        model = Exhibit
        fields = ('id', 'title', 'slug', 'designer_or_creator', 'year_banned', 'ban_category', 'summary', 'primary_image', 'gallery_name', 'is_featured')

class ExhibitDetailSerializer(serializers.ModelSerializer):
    gallery_name = serializers.CharField(source='gallery.title', read_only=True)

    class Meta:
        model = Exhibit
        fields = '__all__'