from django.urls import path
from .views import ExhibitListView, ExhibitDetailView

urlpatterns = [
    path('', ExhibitListView.as_view(), name='exhibit_list'),
    path('<slug:slug>/', ExhibitDetailView.as_view(), name='exhibit_detail'),
]