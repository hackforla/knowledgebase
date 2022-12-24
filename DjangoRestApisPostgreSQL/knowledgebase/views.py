from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from knowledgebase.models import Gdoc
from knowledgebase.serializers import GdocSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def gdoc_list(request):
    # GET list of gdocs, POST a new gdoc, DELETE all gdocs
    print("gdoc_list")
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def gdoc_detail(request, pk):
    # find gdoc by pk (id)
    try: 
        gdoc = Gdoc.objects.get(pk=pk) 
    except Gdoc.DoesNotExist: 
        return JsonResponse({'message': 'The gdoc does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    # GET / PUT / DELETE gdoc
    
        
@api_view(['GET'])
def list_gdoc_published(request):
    # GET all published gdocs
    print("gdoc_list_published")