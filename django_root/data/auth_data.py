from django.core.management import call_command


class AuthData:
    def load_all():
        pass
        # AuthData.load_permissions()
        # AuthData.load_groups()

    def load_permissions():
        print("Loading auth permissions")
        call_command("loaddata", "data/auth_permissions.json")

    def load_groups():
        pass
        print("Loading auth groups")
        call_command("loaddata", "data/auth_groups.json")
