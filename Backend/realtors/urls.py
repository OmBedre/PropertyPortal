from django.urls import path 
from .views import RealtorListview,RealtorView,TopSellerView


urlpatterns = [
    path('<pk>',RealtorListview.as_view()),
    path('',RealtorView.as_view()),
    path('',TopSellerView.as_view())
]

