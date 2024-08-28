from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import JournalEntry
from .serializers import JournalEntrySerializer


@api_view(['GET', 'POST', 'DELETE'])
def journal_entry_list_create(request):
    if request.method == 'GET':
        entries = JournalEntry.objects.all()
        serializer = JournalEntrySerializer(entries, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = JournalEntrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        JournalEntry.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def journal_entry_retrieve_update_destroy(request, pk):
    try:
        entry = JournalEntry.objects.get(pk=pk)
    except JournalEntry.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = JournalEntrySerializer(entry)
        return Response(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        serializer = JournalEntrySerializer(entry, data=request.data, partial=True) # Allow partial update 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)