from rest_framework import serializers 
from kb.models import TopicArea
# from kb.models import Gdoc
 
# class GdocSerializer(serializers.ModelSerializer):
 
#     class Meta:
#         model = Gdoc
#         fields = ('id',
#                   'title',
#                   'description',
#                   'published')

class TopicAreaSerializer(serializers.ModelSerializer):

    class Meta: 
        model = TopicArea
        fields = (
            "uuid",
            "created_at",
            "updated_at", 
            "name",
        )

        read_only_fields = (
            "uuid",
            "created_at",
            "updated_at,"
        )