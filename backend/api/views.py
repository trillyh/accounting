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
from .serializers import JournalEntrySerializer, SubEntrySerializer, UserSerializer


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

# For referenece
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


@api_view(['GET'])#type: ignore
@authentication_classes([TokenAuthentication])#type: ignore
@permission_classes([IsAuthenticated])#type: ignore
def get_all_entries(request):
    user = request.user
    try:
        entries = JournalEntry.objects.filter(user=user)
    except:
        return Response(data={"error": "Error finding journal entry current user"},
                        status=status.HTTP_400_BAD_REQUEST)

    if entries:
        serializer = JournalEntrySerializer(instance=entries, many=True)
        return Response(data=serializer.data,
                        status=status.HTTP_200_OK)
    return Response(data={"error": "Error occured in the server"},
                    status=status.HTTP_400_BAD_REQUEST);

@api_view(['POST'])#type: ignore
@authentication_classes([TokenAuthentication])#type: ignore
@permission_classes([IsAuthenticated])#type: ignore
def create_journal_entry(request):
    user = request.user
    data = request.data.copy() # B/c request.data is immutable 
    data['user'] = user.id

    serializer = JournalEntrySerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)
    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])#type: ignore
@authentication_classes([TokenAuthentication])#type: ignore
@permission_classes([IsAuthenticated])#type: ignore
def create_subentry(request):
    user = request.user
    try:
        journal_entry = JournalEntry.objects.get(pk=request.data["journal_entry_id"])
    except: 
        return Response(data={"error": "could not find journal entry with the supplied journal entry id"}, 
                              status=status.HTTP_400_BAD_REQUEST)

    if (user != None and journal_entry.user != user):
        return Response(data={"error": "Not authorized to access other user subentry"}, 
                              status=status.HTTP_400_BAD_REQUEST)    

    data = request.data.copy()
    data["user"] = user.id
    data["journal_entry"] = journal_entry.pk

    serializer = SubEntrySerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)
    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

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

    if not username or not password:
        return Response(data={'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)
    if user is not None:
        existing_token = Token.objects.filter(user=user).first()

        if existing_token is not None:
            return Response(data={'token':existing_token.key}, status=status.HTTP_200_OK)

        else: 
            new_token = Token.objects.create(user=user)
            return Response(data={'token':new_token.key}, status=status.HTTP_200_OK)
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
