from django.core.management.base import BaseCommand
from data.program_area_data import ProgramAreaData


class Command(BaseCommand):
    help = "Populates data from json files or people depot"

    # def add_arguments(self, parser):
    #     parser.add_argument("poll_ids", nargs="+", type=int)

    def handle(self, *__args__, **__options__):
        ProgramAreaData.update()       
