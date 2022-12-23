from rest_framework import serializers 
from knowledgebase.models import Gdoc
 
 
class GdocSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Gdoc
        fields = ('id',
                  'title',
                  'description',
                  'published')
