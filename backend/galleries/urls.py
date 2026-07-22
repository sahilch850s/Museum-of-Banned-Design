from django.urls import path
from .views import GalleryListView, GalleryDetailView

urlpatterns = [
    path('', GalleryListView.as_view(), name='gallery_list'),
    path('<slug:slug>/', GalleryDetailView.as_view(), name='gallery_detail'),
]