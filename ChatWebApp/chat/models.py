from sqlite3 import Timestamp
from django.db import models
from django.contrib.auth.models import User

#te wszystkie null=True,blank=True wypadałoby
#potem poprawić
class ChatRoom(models.Model):
 
    class Meta:
        ordering = ['last_meesage']

    name = models.CharField(max_length=100)
    creator = models.ForeignKey(User,on_delete=models.CASCADE,related_name="owned_rooms")
    last_meesage = models.DateTimeField(null=True,blank=True)
    members = models.ManyToManyField(User,blank=True,related_name="rooms")

    def __str__(self):
        return "ChatRoom(" + str(self.id) +") of: "+self.creator.username
    
class Message(models.Model):

    class Meta:
        ordering = ['timestamp']

    content = models.CharField(max_length=2500)
    author = models.ForeignKey(User,on_delete=models.CASCADE,related_name="messages",null=True,blank=True)
    room = models.ForeignKey(ChatRoom,on_delete=models.Case,related_name="messages",null=True,blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "Message(" + str(self.id) +") of: "+self.author.username

    
