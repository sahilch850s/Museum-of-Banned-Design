from django.db import models
from django.conf import settings
from exhibits.models import Exhibit

class Reflection(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reflections')
    exhibit = models.ForeignKey(Exhibit, on_delete=models.CASCADE, related_name='reflections')
    comment = models.TextField()
    is_approved = models.BooleanField(default=True)  # Set to False if moderation is needed
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Reflection by {self.user.username} on {self.exhibit.title}"