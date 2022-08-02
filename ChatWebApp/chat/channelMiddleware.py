import constantly
from django.db import close_old_connections
from channels.auth import AuthMiddlewareStack
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from jwt import decode as jwt_decode
from django.conf import settings
from django.contrib.auth import get_user_model
from urllib.parse import parse_qs
from channels.db import database_sync_to_async

@database_sync_to_async
def getUser(id):
     return get_user_model().objects.get(pk=id)


class JwtAuthMiddleware:
    def __init__(self,inner):
        self.inner = inner
    async def __call__(self,scope,recive,send):
        # close_old_connections()

        token = parse_qs(scope["query_string"].decode("utf8"))["token"][0]
        print(token)
        try:
            UntypedToken(token)
        except (InvalidToken, TokenError) as e:
            scope['user'] = None
            return await self.inner(scope,recive,send)
        else:
            decoded_token = jwt_decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user = await getUser(decoded_token['user_id'])
        scope['user'] = user
        return await self.inner(scope,recive,send)

    