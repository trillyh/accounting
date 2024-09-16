from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class JournalEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    entry_date = models.DateField()
    description = models.CharField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.description} created at {self.created_at}"


class SubEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    DEBIT = 'Debit'
    CREDIT = 'Credit'
    TYPE_CHOICES = [
        (DEBIT, 'Debit'),
        (CREDIT, 'Credit')
    ]
    journal_entry = models.ForeignKey(JournalEntry, on_delete=models.CASCADE)
    subentry_type = models.CharField(max_length=255, choices=TYPE_CHOICES)
    account = models.CharField(max_length=255) 
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    def __str__(self):
        return f"{self.subentry_type} ${self.amount} in {self.account}" 
