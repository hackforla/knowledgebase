rm -rf $PWD/DjangoRestApisPostgreSQL/knowledgebase/gdocs2md
ln -s $PWD/utils/gdocs2md $PWD/DjangoRestApisPostgreSQL/knowledgebase/gdocs2md
rm -rf $PWD/DjangoRestApisPostgreSQL/knowledgebase/.env
rm -rf $PWD/DjangoRestApisPostgreSQL/.env
ln -s $PWD/utils/.env $PWD/DjangoRestApisPostgreSQL/.env
