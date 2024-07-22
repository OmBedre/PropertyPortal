from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from .models import Contact

class ContactCreateView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        try:
            send_mail(
                subject=data['subject'],
                message=f"Name: {data['name']}\nEmail: {data['email']}\n\nMessage:\n{data['message']}",
                from_email='bedreom02@gmail.com',
                recipient_list=['bedreom02@gmail.com'],
                fail_silently=False
            )

            contact = Contact(
                name=data['name'],
                email=data['email'],
                subject=data['subject'],
                message=data['message']
            )

            contact.save()

            return Response({'success': "Message sent successfully"})
        except Exception as e:
            return Response({'error': f'Failed to send the message: {str(e)}'})
