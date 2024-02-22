
from rest_framework import serializers
from .models import  Bus, Route, Assignment, Breakdown,Driver
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ('id', 'username', 'email', 'first_name', 'last_name','is_staff')

class UserCreateSerializer(BaseUserCreateSerializer):
    
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ('id', 'username', 'email','first_name', 'last_name','password')
  


class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = '__all__'


class BusSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Bus
        fields = '__all__'

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = '__all__'

class AssignmentWriteSerializer(serializers.ModelSerializer):
    driver = serializers.PrimaryKeyRelatedField(queryset=Driver.objects.all())
    bus = serializers.PrimaryKeyRelatedField(queryset=Bus.objects.all())
    route = serializers.PrimaryKeyRelatedField(queryset=Route.objects.all())

    class Meta:
        model = Assignment
        fields = '__all__'

class AssignmentReadSerializer(serializers.ModelSerializer):
    driver = DriverSerializer()
    bus = BusSerializer()
    route = RouteSerializer()

    class Meta:
        model = Assignment
        fields = '__all__'

    
class BreakdownSerializer(serializers.ModelSerializer):
    bus = BusSerializer()
    class Meta:
        model = Breakdown
        fields = '__all__'
