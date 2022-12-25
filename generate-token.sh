grep -v TOKEN .env > .env.tmp
cp .env.tmp .env
rm .env.tmp
cat .env
node utils/googleoauth2-utils/src/generate-token.js
cat .env