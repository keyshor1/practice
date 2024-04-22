from django.contrib import admin
from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_view
from .views import (
    CustomerRegistrationView, CustomerLoginView
)

urlpatterns = [
    path('', views.CustomerLoginView, name='login'),
    path('registration/', CustomerRegistrationView.as_view(), name='customerregistration'),
    path('home/', views.home, name='home'),
    path('staff/', views.staffdetail, name='staff'),
    path('book_service/', views.book_service, name='book_service'),
    path('logout/', auth_view.LogoutView.as_view(next_page='login'), name='logout'),
]