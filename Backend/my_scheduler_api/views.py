from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from .models import Employee
from .serializers import *
from django.http import JsonResponse
from rest_framework.decorators import *




@api_view(['POST','GET'])
def index(request):
    return JsonResponse("My API for DIAM",safe=False)
        
@api_view(['POST','GET'])
def employee(request):
    if request.method == "GET":
        employee=Employee.objects.all()
        serialize = EmployeeSerializer(employee,many=True)
        return JsonResponse(serialize.data,safe=False)
    if request.method == "POST":
        employee = EmployeeSerializer(data=request.data)
        if employee.is_valid() :
            employee.save()
            return JsonResponse("Saved",safe=False)  

@api_view(['POST','GET'])        
def services(request):
    if request.method == "GET":
        Service=Servicos.objects.all()
        serialize = ServiceSerializer(Service,many=True)
        return JsonResponse(serialize.data,safe=False)
    if request.method == "POST":
        Service = ServiceSerializer(data=request.data)
        if Service.is_valid() :
            Service.save()
            return JsonResponse("Saved",safe=False)  

@api_view(['PUT','GET',"DELETE"])  
def employeeId(request,pk):
    if request.method == "GET":
        employee = Employee.objects.get(pk=pk)
        serialize = EmployeeSerializer(employee,many=False)
        return JsonResponse(serialize.data,safe=False)

@api_view(['POST','GET'])  
def appointment(request):
    if request.method == "GET":
        appointment =Appointment.objects.all()
        serialize = AppointmentSerializer(appointment,many=True)
        return JsonResponse(serialize.data,safe=False)
    if request.method == "POST":
        print("recebi o post")
        appointment = AppointmentSerializer(data=request.data)
        if appointment.is_valid() :
            print("TESTE")
            appointment.save()
            appointment_data = {
            'message': 'Appointment created successfully!'
            }
            return JsonResponse(appointment_data, status=201)
         # Handle other HTTP methods if necessary
        return JsonResponse({'error': 'Method not allowed'}, status=405)




