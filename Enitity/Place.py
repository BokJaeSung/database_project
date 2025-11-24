from datetime import datetime
from typing import Optional

class Place:
    def __init__(self, place_id: Optional[int] = None, name: str = None, 
                 average_rating: Optional[float] = None, latitude: float = None, 
                 longitude: float = None, created_at: Optional[datetime] = None):
        self.place_id = place_id
        self.name = name
        self.average_rating = average_rating
        self.latitude = latitude
        self.longitude = longitude
        self.created_at = created_at