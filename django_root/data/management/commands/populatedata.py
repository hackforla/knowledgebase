from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Populates data from json files or people depot"

    # def add_arguments(self, parser):
    #     parser.add_argument('poll_ids', nargs='+', type=int)

    def handle(self, *__args__, **__options__):
        DataUtil.update_all_data()


from data.data_utils import DataUtil
