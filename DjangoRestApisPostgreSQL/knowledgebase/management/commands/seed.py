# <project>/<app>/management/commands/seed.py
from django.core.management.base import BaseCommand
from knowledgebase.models import PracticeArea, ProgramArea

# python manage.py seed --mode=refresh

""" Clear all data and creates addresses """
MODE_REFRESH = 'refresh'

""" Clear all data and do not create any object """
MODE_CLEAR = 'clear'

class Command(BaseCommand):
    help = "seed database for testing and development."

    def add_arguments(self, parser):
        parser.add_argument('--mode', type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write('seeding data...')
        run_seed(self, options['mode'])
        self.stdout.write('done.')


def clear_data():
    """Deletes all the table data"""
    # logger.info("Delete Program Area")
    ProgramArea.objects.all().delete()
    PracticeArea.objects.all().delete()


def create_program():

    """Creates an address object combining different elements from the list"""
    names = [
        "Citizen Engagement",
        "Civic Tech Infrastructure",
        "Diversity / Equity / Inclusion",
        "Environment",
        "Justice",
        "Social Safety Net",
        "Vote / Representation",
        "Workforce Development",
    ]

    for name in names:
        program = ProgramArea(
            name=name
        )
        program.save()

def create_practice():

    """Creates an address object combining different elements from the list"""
    names = [
        "Data Science",
        "Devops (Hosting, Infrastructure and Architecture)",
        "Marketing",
        "Product Management",
        "Revenue (Fundraising and Earned Revenue)",
        "Software Engineering (Programming)",
        "User Research",
        "Design"
    ]

    for name in names:
        practiceArea = PracticeArea(
            name=name
        )
        practiceArea.save()

def run_seed(self, mode):
    """ Seed database based on mode

    :param mode: refresh / clear 
    :return:
    """
    # Clear data from tables
    clear_data()
    if mode == MODE_CLEAR:
        return

    create_program()