- Create script in django_root/kb/scripts.  Do not use conditional statement `if __name__ = "main"`.  The Django runscript command does not use __name__.
- From django_root, Execute this command if not done already:
```
source loadenv.sh .env.local
```
- Execute this command:
```
python manage.py runscript kb.scripts.<script_name>
```
Script name does not include the "py" extension.  For example: `python manage.py runscript doit"`.  

List specific script below:
```
python manage.py kb.scripts.insert_assets_from_csv
```
