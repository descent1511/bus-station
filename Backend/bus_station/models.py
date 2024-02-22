from django.db import models
from django.contrib.auth.models import AbstractUser

class Driver(models.Model):
    name = models.CharField(max_length=255)
    birthday = models.DateField(null=True)
    passport_data = models.CharField(max_length=255)
    class_name = models.CharField(max_length=50)
    work_experience = models.IntegerField(null=True, blank=True)
    base_salary = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.name}"


class Bus(models.Model):
    registration_number = models.CharField(max_length=20)
    capacity = models.IntegerField()
    def __str__(self):
        return f"{self.registration_number}"



class Route(models.Model):
    start_point = models.CharField(max_length=255)
    end_point = models.CharField(max_length=255)
    start_time = models.TimeField()
    end_time = models.TimeField()
    interval = models.IntegerField()
    duration = models.IntegerField()

    def __str__(self):
        return f"{self.start_point} to {self.end_point}"

class Assignment(models.Model):
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.driver.name} - {self.bus.registration_number} - {self.route.start_point}"

class Breakdown(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    date = models.DateField()
    reason = models.TextField()

    def __str__(self):
        return f"{self.bus.registration_number} - {self.date}"
