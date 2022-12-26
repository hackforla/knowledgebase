rm -rf $PWD/DjangoRestApisPostgreSQL/knowledgebase/gdocs2md
ln -s $PWD/utils/gdocs2md $PWD/DjangoRestApisPostgreSQL/knowledgebase/gdocs2md
rm $PWD/DjangoRestApisPostgreSQL/.env
ln -s $PWD/.env $PWD/DjangoRestApisPostgreSQL/.env
