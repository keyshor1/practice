from django.urls import path
from api import views

urlpatterns = [
    path('notes/', views.NoteListCreate.as_view(), name='note-list'),
    path('notes/delete/<int:pk>/', views.NoteDelete.as_view(), name='note-delete'),
    path('services/', views.ServicesListCreate.as_view(), name='services-list-create'),
    path('student/', views.StudentList.as_view()),
]