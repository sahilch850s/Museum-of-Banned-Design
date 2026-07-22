from django.db import models
from galleries.models import Gallery

class Exhibit(models.Model):
    class BanReason(models.TextChoices):
        POLITICAL = 'POLITICAL', 'Political Censorship'
        ETHICAL = 'ETHICAL', 'Ethical / Dark Patterns'
        CULTURAL = 'CULTURAL', 'Cultural Taboo'
        SAFETY = 'SAFETY', 'Safety & Regulation'
        OTHER = 'OTHER', 'Other'

    gallery = models.ForeignKey(Gallery, related_name='exhibits', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    designer_or_creator = models.CharField(max_length=200, default='Unknown')
    year_created = models.IntegerField(blank=True, null=True)
    year_banned = models.IntegerField(blank=True, null=True)
    ban_category = models.CharField(max_length=20, choices=BanReason.choices, default=BanReason.POLITICAL)
    
    summary = models.TextField(help_text="Short teaser for cards")
    full_story = models.TextField(help_text="Detailed story of the design and its ban")
    
    primary_image = models.ImageField(upload_to='exhibits/primary/')
    historical_context = models.TextField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-year_banned', '-created_at']

    def __str__(self):
        return self.title