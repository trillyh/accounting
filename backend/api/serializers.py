from rest_framework import serializers
from .models import JournalEntry
from django.contrib.auth.models import User


class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = ["id", "entry_date", "description", "created_at"]
#   under the hood are create() and update() method:
#   def create(self, validated_data):
#       return JournalEntry.objects.create(**validated_data)

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


