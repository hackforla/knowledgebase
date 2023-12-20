from rest_framework import serializers 
from django_kb_app.models import TopicArea
# from django_kb_app.models import Gdoc
 
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