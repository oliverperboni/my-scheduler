from django.urls import path
from . import views


app_name = "my_scheduler_api"
urlpatterns = [
    path('employees/', views.getEmployee, name='employee-create'),
    # path('employees/', views.EmployeeList.as_view(), name='employee-list'),
    path("/", views.index, name="index")
]
