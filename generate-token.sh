grep -v GOOGLE_DOCS_TOKEN .env > .env.tmp
cp .env.tmp .env
rm .env.tmp
cat .env
ts-node utils/googleoauth2-utils/src/generate-token.js
cat .env