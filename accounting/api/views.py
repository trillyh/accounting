from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import JournalEntry
from .serializers import JournalEntrySerializer

# Create your views here.
class JournalEntryListCreate(generics.ListCreateAPIView):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer

    def delete(self, request, *args, **kwargs):
        JournalEntry.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class JournalEntryRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer 
    lookup_field =  "pk"