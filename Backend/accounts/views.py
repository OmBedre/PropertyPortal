from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes

User = get_user_model()

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    data = request.data

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    password2 = data.get('password2')

    if not all([name, email, password, password2]):
        return Response({'error': 'All fields are required'}, status=400)

    if password != password2:
        return Response({'error': 'Passwords do not match'}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=400)

    if len(password) < 6:
        return Response({'error': 'Password must be at least 6 characters long'}, status=400)

    user = User.objects.create_user(email=email, password=password, name=name)
    user.save()

    return Response({'success': 'User created successfully'}, status=201)
