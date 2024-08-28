from django.urls import path
from .views import *

urlpatterns = [
    path('journalentries/', journal_entry_list_create, name='journalentry-list-create'),
    path('journalentry/<int:pk>/', journal_entry_retrieve_update_destroy, name='journalentry-detail'),
]
