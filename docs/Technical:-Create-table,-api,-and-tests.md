Once you have the model name and the field, follow the instructions below.
1. Create model.  Look for model TopicArea for an example.
  - Modify **kb/model.py**
  - Run from terminal
 ```
 python manage.py makemigrations
 python manage.py migration
```

2. Add code for displaying on screen.  You can manually edit **kb/api/admin.py** using TopicArea as an example or run
```
python manage.py autogenerate_admin <ModelName>
```

3. Verify you can add and list asset types from admin screen (http://

4. Add serializer to specify which fields are returned by the serializer.  Standard kb apisreturn all fields except created_date and updated_date.  You can manually edit **kb/api/serializers.py** using TopicArea as an example or run 
```
python manage.py autogenerate_serializers <ModelName>
```

4. Add views, decorate with @extended_schema, and specify serializer from previous step.  You can manually edit **kb/api/views.py** using TopicArea as an example or run
```
python manage.py autogenerate_views <ModelName>
```

5. Add url to urls.py, decorate with @extended_schema, and specify serializer from previous step.  You can manually edit **kb/api/views.py** using TopicArea as an example or run
```
python manage.py autogenerate_urls <ModelName>
```

6. Manually verify the API is working using Swagger documentation by navigating to http://localhost:8001/api/schema/swagger-ui/ and selecting the API from the list of APIs.

7. Manually verify the schema using http://localhost:8001/api/schema/swagger-ui/ and navigating to the schema section.
8. Verify URL http://localhost:8001/api/schema/ downloads or displays a schema and that the schema includes the API.

9. Add tests.  You can manually edit the files specified below using TopicArea as an example or run
```
python manage.py autogenerate_tests <ModelName>
```

10. To run tests, from terminal type:
```
pytest
```

