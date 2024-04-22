from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_verified = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

SERVICE_CHOICES = (
    ('Maid', 'Maid'),
    ('Carpet', 'Carpet'),
    ('Tile', 'Tile'),
)

STATUS_CHOICES = {
    ('Pending','Pending'),
    ('Accepted','Accepted'),
}

class Services(models.Model):# assignining name of table
    servicename = models.CharField(choices=SERVICE_CHOICES, max_length=50)
    servicedescription = models.TextField(max_length=1000)
    services_image = models.ImageField(upload_to='services')

    def __str__(self):
            return str(self.servicename)

class Staff(models.Model):
    staffname = models.CharField(max_length=200)
    profession = models.CharField(choices=SERVICE_CHOICES, max_length=50)
    staffage = models.IntegerField()
    staffaddress = models.CharField(max_length=200)
    staffsummary = models.TextField()
    staffdocument = models.ImageField(upload_to='document')
    registerdate = models.DateTimeField(auto_now_add=True)
    staffstatus = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pending')
    def __str__(self):
            return str(self.staffname)

class Booking(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    bookingdate = models.DateField()
    service = models.CharField(choices=SERVICE_CHOICES, max_length=50)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank=True)
    telephone = models.IntegerField(unique=True)
    address = models.CharField(max_length=250)
    formdate = models.DateTimeField(auto_now_add=True)
    bookingstatus = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pending')
    def __str__(self):
            return str(self.user)