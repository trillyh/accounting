# Generated by Django 5.2.dev20240704183052 on 2024-09-10 00:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_delete_playgroundsession'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subentry',
            old_name='sub_entry_type',
            new_name='subentry_type',
        ),
    ]
