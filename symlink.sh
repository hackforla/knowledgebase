rm -rf $PWD/django-root/knowledgebase/gdocs2md
ln -s $PWD/utils/gdocs2md $PWD/django-root/knowledgebase/gdocs2md
rm $PWD/django-root/.env
ln -s $PWD/.env $PWD/django-root/.env
