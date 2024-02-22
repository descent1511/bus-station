from .serializers import DriverSerializer, BusSerializer, RouteSerializer, AssignmentWriteSerializer, BreakdownSerializer, AssignmentReadSerializer
from .models import Driver, Bus,  Route, Assignment, Breakdown
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework import permissions
from datetime import datetime

from djoser.views import UserViewSet as DjoserUserViewSet

from rest_framework.response import Response
from rest_framework import status

class DriverViewSet(viewsets.ModelViewSet):
    serializer_class = DriverSerializer
    queryset = Driver.objects.all()
    # permission_classes = [IsAdminUser]


class BusViewSet(viewsets.ModelViewSet):
    serializer_class = BusSerializer
    queryset = Bus.objects.all()
    # permission_classes = [IsAdminUser]


class RouteViewSet(viewsets.ModelViewSet):
    serializer_class = RouteSerializer
    queryset = Route.objects.all()
    # permission_classes = [IsAdminUser]


    
    
class AssignmentViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):

        if self.request.method == 'GET':
            return AssignmentReadSerializer
        return AssignmentWriteSerializer
    queryset = Assignment.objects.all()
    # permission_classes = [IsAdminUser]


class BreakdownViewSet(viewsets.ModelViewSet):
    serializer_class = BreakdownSerializer
    queryset = Breakdown.objects.all()
    # permission_classes = [IsAdminUser]


class DriversOnRouteView(generics.ListAPIView):
    serializer_class = AssignmentReadSerializer

    def get_queryset(self):
        route_id = self.kwargs['route_id']
        return Assignment.objects.filter(route_id=route_id)


class BusScheduleView(generics.ListAPIView):
    serializer_class = AssignmentReadSerializer

    def get_queryset(self):
        start_point = self.request.query_params.get('start_point', None)
        end_point = self.request.query_params.get('end_point', None)
        date = self.request.query_params.get('date', None)

        queryset = Assignment.objects.all()

        if start_point:
            queryset = queryset.filter(route__start_point=start_point)

        if end_point:
            queryset = queryset.filter(route__end_point=end_point)

        if date:

            queryset = queryset.filter(
                start_date__lte=date, end_date__gte=date)

        return queryset


class InactiveBusesView(generics.ListAPIView):
    serializer_class = BreakdownSerializer

    def get_queryset(self):
        date = self.kwargs['date']
        return Breakdown.objects.filter(date=date)


class DriverCountByClassView(generics.ListAPIView):
    serializer_class = DriverSerializer

    def get_queryset(self):
        class_name = self.kwargs['class_name']
        return Driver.objects.filter(class_name=class_name)
