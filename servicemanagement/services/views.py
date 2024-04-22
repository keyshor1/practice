from django.contrib.auth import login, authenticate
from django.contrib import messages
from django.shortcuts import render, redirect
from django.views import View
from django.core.exceptions import ValidationError
from .forms import CustomerRegistrationForm  # Your custom registration form
from .models import *
from django.contrib.auth.models import User

class CustomerRegistrationView(View):
    def get(self, request):
        # Handling GET request for registration page
        form = CustomerRegistrationForm()
        return render(request, 'app/registration.html', {'form': form})

    def post(self, request):
        # Handling POST request for registration form submission
        form = CustomerRegistrationForm(request.POST)
        if form.is_valid():
            # If form is valid, save the user and create a Profile object
            user = form.save(commit=False)
            user.save()

            # Additional data for Profile 
            
            profile_obj = Profile.objects.create(user=user)  # Adjust is_verified as needed
            profile_obj.save()

            # Log in the user and redirect to the login page
            login(request, user)
            messages.success(request, 'Registration successful. You are now logged in.')
            return redirect('/registration')  # Adjust the redirect URL as needed
        else:
            # If form is not valid, display error messages and render the registration page again
            messages.error(request, 'Invalid form data. Please check the form and try again.')
            return render(request, 'app/registration.html', {'form': form})

def CustomerLoginView(request):
        if request.method == 'POST':
            username = request.POST.get('username')
            password = request.POST.get('password')
            user_obj = User.objects.filter(username=username).first()
            if user_obj is None:
                messages.error(request, 'User not found. Please register.')
                return render(request, 'app/login.html')

            profile_obj = Profile.objects.filter(user=user_obj).first()

            if not profile_obj.is_verified:
                messages.error(request, 'Your profile is not verified. Please register.')
                return render(request, 'app/login.html')

            user = authenticate(username=username, password=password)
            if user is None:
                messages.error(request, 'Invalid password. Please register.')
                return render(request, 'app/login.html')

            login(request, user)
            return redirect('/home')

        return render(request, 'app/login.html', locals())

def home(request):
    service = Services.objects.all()
    staff = Staff.objects.all()
    context = {'service': service}
    return render(request, 'app/index.html', context)

def staffdetail(request):
    staffs = Staff.objects.all()
    context = {'staffs': staffs}
    return render(request, 'app/staff.html', context)


def book_service(request):
    if request.method == 'POST':
        date = request.POST.get('bookingdate')
        service = request.POST.get('services')
        staff_id = request.POST.get('staff')  # Assuming staff is part of your form
        telephone = request.POST.get('contact')
        address = request.POST.get('Address')

        # Assuming you have a user associated with the booking
        user = request.user

        # Creating the Booking object
        booking = Booking.objects.create(user=user, bookingdate=date, service=service, staff=staff_id, telephone=telephone, address=address)
        booking.save()

        messages.success(request, 'Booking successful.')
        return redirect('/home')  # Redirect to a success page or adjust as needed
    else:
        return render(request, 'app/index.html')
