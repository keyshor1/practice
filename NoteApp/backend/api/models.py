from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=140)
    content = models.TextField()
    created_time = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title
    

SERVICE_CHOICES = (
    ('Maid', 'Maid'),
    ('Carpet', 'Carpet'),
    ('Tile', 'Tile'),
)

class Services(models.Model):
    servicename = models.CharField(choices=SERVICE_CHOICES, max_length=50)
    servicedescription = models.TextField(max_length=1000)
    services_image = models.ImageField(upload_to='services')

    def __str__(self):
            return str(self.servicename)


class Student(models.Model):
    studname = models.CharField(max_length=100)
    email = models.CharField(max_length=100)

    def __str__(self):
        return self.studname
    

    
