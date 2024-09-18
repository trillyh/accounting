from rest_framework import serializers
from .models import JournalEntry, SubEntry
from django.contrib.auth.models import User

#   under the hood are create() and update() method:
#   def create(self, validated_data):
#   return JournalEntry.objects.create(**validated_data)

class JournalEntrySerializer(serializers.ModelSerializer):
    #All fields in serializers are treated as required unless marked otherwise
    entry_date = serializers.DateField(format='%Y-%m-%d')
    
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M', read_only=True)    
    
    # by setting the queryset  to User.objects.all(), I allowed lookups to all Users
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(),
                                              required=False,
                                              allow_null=True)
    class Meta: 
        model = JournalEntry
        fields = ["id", "entry_date", "description", "created_at", "user"]

    
class SubEntrySerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(),
                                              required=False,
                                              allow_null=True)
    journal_entry = serializers.PrimaryKeyRelatedField(queryset=JournalEntry.objects.all(),
                                              required=True,
                                              allow_null=False)
    class Meta:
        model = SubEntry
        fields = ["user", "journal_entry", "subentry_type", "account", "amount"]



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
