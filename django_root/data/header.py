import os
import hashlib
import hmac
import time
import os


PEOPLE_DEPOT_URL=os.environ.get('PEOPLE_DEPOT_URL', default="")


PEOPLE_DEPOT_API_KEY = os.environ.get('PEOPLE_DEPOT_API_KEY')
PEOPLE_DEPOT_API_SECRET = os.environ.get('PEOPLE_DEPOT_API_SECRET')
PEOPLE_DEPOT_URL = os.environ.get('PEOPLE_DEPOT_URL')


class HeaderUtil:

    @staticmethod
    def prepare_headers():
        if not PEOPLE_DEPOT_URL:
            return {}
        timestamp = str(int(time.time()))
        message = f"{timestamp}{PEOPLE_DEPOT_API_KEY}"
        
        signature = hmac.new(PEOPLE_DEPOT_API_SECRET.encode('utf-8'), message.encode('utf-8'), hashlib.sha256).hexdigest()
        return {
            'X-API-Key': PEOPLE_DEPOT_API_KEY,
            'X-API-Timestamp': timestamp,
            'X-API-Signature': signature,
        }
        

                

         
