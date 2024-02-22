from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    DriverViewSet,
    BusViewSet,

    RouteViewSet,
    AssignmentViewSet,
    BreakdownViewSet,
    DriversOnRouteView,
    BusScheduleView,
    InactiveBusesView,
    DriverCountByClassView,
)

router = DefaultRouter()
router.register(r'drivers', DriverViewSet)
router.register(r'buses', BusViewSet)

router.register(r'routes', RouteViewSet)
router.register(r'assignments', AssignmentViewSet)
router.register(r'breakdowns', BreakdownViewSet)

urlpatterns = [
    path('routes/<int:route_id>/drivers/', DriversOnRouteView.as_view(), name='drivers-on-route'),
    path('routes/search/',  BusScheduleView.as_view(), name='bus-schedule'),
    path('breakdowns/<str:date>/inactive-buses/', InactiveBusesView.as_view(), name='inactive-buses'),
    path('drivers/class/<str:class_name>/', DriverCountByClassView.as_view(), name='driver-count-by-class'),

]

urlpatterns += router.urls
