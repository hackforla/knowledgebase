# <project>/<app>/management/commands/seed.py
from django.core.management.base import BaseCommand
from django.contrib.auth.models import Permission, Group

# python manage.py seed --mode=refresh

""" Clear all data and creates addresses """
MODE_REFRESH = "refresh"
print("Debugging start", __name__)

""" Clear all data and do not create any object """
MODE_CLEAR = "clear"


class Command(BaseCommand):
    help = "seed database for testing and development."

    def add_arguments(self, parser):
        parser.add_argument("--mode", type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write("seeding data...")
        clear_data()
        self.stdout.write("done.")


def clear_data():
    """Deletes all the table data"""
    print("Debugging Clearing")
    Group.objects.all().delete()
    Permission.objects.all().delete()


if __name__ == "__main__":
    print("Debugging calling")
    clear_data()
