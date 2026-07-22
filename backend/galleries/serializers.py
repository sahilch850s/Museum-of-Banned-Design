from rest_framework import serializers
from .models import Gallery

class GallerySerializer(serializers.ModelSerializer):
    exhibits_count = serializers.IntegerField(source='exhibits.count', read_only=True)

    class Meta:
        model = Gallery
        fields = ('id', 'title', 'slug', 'description', 'cover_image', 'exhibits_count')