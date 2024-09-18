from django.urls import path
from .views import *

urlpatterns = [
    path('journalentries/', journal_entry_list_create, name='journalentry_list_create'),
    path('journalentry/<int:pk>/', journal_entry_retrieve_update_destroy, name='journalentry_detail'),
    path('register/', register_user, name='register_user'),
    path('login/', login, name='login_user'),
    path('logout/', logout, name='logout_user'),
    path('create_journal_entry/', create_journal_entry, name='create_entry'),
    path('create_subentry/', create_subentry, name='create_subentry'),
    path('get_all_entries/', get_all_entries, name='get_all_entry'),
    path('delete_entry/', delete_entry, name='delete_entry'),
]
