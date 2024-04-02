from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    workDays = models.JSONField() 
    start_time = models.CharField(max_length=10)
    end_time = models.CharField(max_length=10)

    def __str__(self):
        return f"Employee {self.id}: {self.name}"

 # Assuming your client model is defined in a file called client.py in the same directory


class Client(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    phone = models.CharField(max_length=15)
    
    def __str__(self):
        return f"client {self.id}: {self.name}"

class Servicos(models.Model):
    name = models.CharField(max_length=100)
    duration = models.IntegerField()
    price = models.FloatField()
    # client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='services')

    def __str__(self):
        return f"Service {self.id}: {self.name}"

class Appointment(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    #  client = models.ForeignKey(Client, on_delete=models.CASCADE)
    service = models.ForeignKey(Servicos, on_delete=models.CASCADE)
    date = models.CharField(max_length=100)
    time = models.CharField(max_length=100)

    def __str__(self):
        return f"Appointment {self.id} -  with {self.employee.name} for {self.service.name} on {self.date} at {self.time}"
