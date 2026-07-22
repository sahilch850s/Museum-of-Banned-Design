from rest_framework import generics, permissions
from .models import Exhibit
from .serializers import ExhibitListSerializer, ExhibitDetailSerializer

class ExhibitListView(generics.ListAPIView):
    serializer_class = ExhibitListSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Exhibit.objects.all()
        gallery_slug = self.request.query_params.get('gallery', None)
        featured = self.request.query_params.get('featured', None)
        
        if gallery_slug:
            queryset = queryset.filter(gallery__slug=gallery_slug)
        if featured:
            queryset = queryset.filter(is_featured=True)
            
        return queryset

class ExhibitDetailView(generics.RetrieveAPIView):
    queryset = Exhibit.objects.all()
    serializer_class = ExhibitDetailSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.AllowAny]