# Generated by Django 4.0.5 on 2022-06-13 18:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.db.models.expressions


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat', '0002_alter_message_author_alter_message_room'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatroom',
            name='last_meesage',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='chatroom',
            name='members',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='message',
            name='author',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='meesages', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='message',
            name='room',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.expressions.Case, related_name='meesages', to='chat.chatroom'),
        ),
    ]
