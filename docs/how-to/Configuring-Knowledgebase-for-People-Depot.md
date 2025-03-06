- If you have entered any data into Knowledgebase that is replicated (user, groups, practice_area, technology) delete it
- Start peopledepot from a terminal (see CONTRIBUTING.md in https://github.com/codeforboston/peopledepot)
- Uncomment the PEOPLE_DEPOT_URL value from the terminal:
```
cd django_root
# pick one of these
cp .env.local-example .env.local
cp .env.docker-example .env.docker
```
- Uncomment out PEOPLE_DEPOT_URL

