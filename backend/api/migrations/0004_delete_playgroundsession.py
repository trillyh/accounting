# Generated by Django 5.2.dev20240704183052 on 2024-09-02 18:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_playgroundsession'),
    ]

    operations = [
        migrations.DeleteModel(
            name='PlaygroundSession',
        ),
    ]