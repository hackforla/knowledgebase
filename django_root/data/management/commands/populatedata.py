from django.core.management.base import BaseCommand
from data.data_utils import DataUtil


class Command(BaseCommand):
    help = "Populates data from json files or people depot"
    print("Here we are")

    # def add_arguments(self, parser):
    #     parser.add_argument('poll_ids', nargs='+', type=int)

    def handle(self, *__args__, **__options__):
        print("handling")
        DataUtil.update_all_data()
        

