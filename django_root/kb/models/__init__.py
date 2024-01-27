from .simple_models import *
from .manytomany_models import *
from .asset_models import AssetGroup, Asset, AssetType, AssetCategory

if not (AssetGroup, Asset, AssetType, AssetCategory):  # Avoid flake8 error F821 undefined name
    print("Dummy print statement to avoid flake8 error.")
