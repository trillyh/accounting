from django.urls import path
from . import views

urlpatterns = [
    path("journalentry/",
        views.JournalEntryListCreate.as_view(),
        name="journalentry-view-create"),

    path("journalentry/<int:pk>/",
        views.JournalEntryRetrieveUpdateDestroy.as_view(),
        name="update")
]
