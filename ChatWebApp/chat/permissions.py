from rest_framework import permissions

class IsMessegeOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.author == request.user
class HasAccesToRoom(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.GET.get('id'):
            return False
        _id = request.GET.get('id')
        if not request.user.rooms.all().filter(id=_id):
            return False
        return True
    

