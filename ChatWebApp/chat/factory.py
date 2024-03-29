from faker import Faker
import factory
from django.contrib.auth.models import User
import random
from chat.models import Message,ChatRoom
from user_profile.factory import ProfileFactory
fake = Faker()

def populateDb():
    for x in range(10):
        profile = ProfileFactory()
        profile.save()
    for x in range(5):
        room = ChatRoomFactory(members=4)
        room.save()
def toId(list):
    ids = []
    for item in list:
        ids.append(item.id)
    return ids

class MessageFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Message
    content = fake.text()
    author = factory.Iterator(User.objects.all())
    room = factory.Iterator(ChatRoom.objects.all())
    @factory.post_generation
    def room(message,create,extracted,**kwargs):
        if not create: return
        if extracted is not None:
            room = extracted
        message.room = room
        message.author = room.members.order_by('?')[0]
        

class ChatRoomFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ChatRoom
    name = fake.name()
    creator = factory.Iterator(User.objects.all())

    @factory.post_generation
    def members(room,create,extracted,**kwargs):
        if not create: return
        if extracted is not None:
            num = extracted
        items = list(User.objects.all())
        random_items = toId(random.sample(items, num))
        random_items.append(room.creator.id)
        #potem to zmienie
        for id in random_items:
            room.members.add(id)

        for i in range(random.randint(3, 9)):
            message = MessageFactory(room = room)
            message.save()






        
