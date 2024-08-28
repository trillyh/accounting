from rest_framework import serializers
from .models import JournalEntry


class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = ["id", "entry_date", "description", "created_at"]