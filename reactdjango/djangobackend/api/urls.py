from django.urls import path
from api import views

urlpatterns = [
    path('student/', views.StudentList.as_view()),
    path('create-student/', views.StudentCreate.as_view()),  # Add this line for creating a new student
]