# for basic view, response, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# For authentication and login tokens
from django.contrib.auth import authenticate 
from rest_framework.decorators  import authentication_classes, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import TokenAuthentication

# import models
from .models import JournalEntry

# serializers import
from .serializers import JournalEntrySerializer, UserSerializer


# Should be delete soon, for testing only, or add isAdminUser decor
@api_view(['GET', 'POST', 'DELETE']) #type: ignore
@authentication_classes([TokenAuthentication]) #type: ignore
@permission_classes([IsAuthenticated]) #type: ignore
def journal_entry_list_create(request):
    if request.method == 'GET':
        entries = JournalEntry.objects.all()
        serializer = JournalEntrySerializer(instance=entries, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = JournalEntrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        JournalEntry.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE']) #type: ignore
def journal_entry_retrieve_update_destroy(request, pk):
    try:
        entry = JournalEntry.objects.get(pk=pk)
    except JournalEntry.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = JournalEntrySerializer(instance=entry)
        return Response(data=serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        serializer = JournalEntrySerializer(instance=entry, data=request.data, partial=True) # Allow partial update 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data, partial=False)
    if serializer.is_valid():
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    username: str = request.data.get('username')
    password: str = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        token = Token.objects.create(user=user)
        return Response(data={'token':token.key}, status=status.HTTP_200_OK)
    else:
        return Response(data={'error': 'Username or password is not correct'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
    except Token.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
