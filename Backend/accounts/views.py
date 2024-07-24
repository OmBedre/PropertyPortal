from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import status

User = get_user_model()

@method_decorator(csrf_exempt, name='dispatch')
class SignUpView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = request.data

        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        password2 = data.get('password2')

        # Check if required fields are provided
        if not all([name, email, password, password2]):
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        if password != password2:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        if len(password) < 6:
            return Response({'error': 'Password must be at least 6 characters'}, status=status.HTTP_400_BAD_REQUEST)

        # Create user
        user = User.objects.create_user(email=email, password=password, name=name)
        user.save()
        
        return Response({'success': 'User created successfully'}, status=status.HTTP_201_CREATED)
