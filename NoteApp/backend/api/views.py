from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import UserSerializer, NoteSerializer, ServicesSerializer, StudentSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, Services, Student
from rest_framework.generics import ListAPIView


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author = self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class ServicesListCreate(generics.ListCreateAPIView):
    serializer_class = ServicesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Adjust the filtering logic as per your requirements
        return Services.objects.filter(author=user)
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class StudentList(ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
