from rest_framework import parsers,generics, permissions, pagination
from rest_framework.response import Response
class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 15
    page_size_query_param = 'page_size'
    max_page_size = 15

    def get_paginated_response(self, data):
        next = self.page.number + 1
        if(self.get_next_link()==None):
            next = None
        context = {
            'next': next,
            'count': self.page.paginator.count,
            'results': data,
        }
        return Response(context)