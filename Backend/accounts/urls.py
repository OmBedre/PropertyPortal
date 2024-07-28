from django.urls import path
from .views import signup

urlpatterns = [
    path('api/accounts/signup/', signup, name='signup'),
]
