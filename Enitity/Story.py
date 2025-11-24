from datetime import datetime
from typing import Optional

class Story:
    def __init__(self, story_id: Optional[int] = None, user_id: Optional[int] = None, 
                 image_url: Optional[str] = None, content: Optional[str] = None, 
                 latitude: float = None, longitude: float = None, 
                 likes: Optional[int] = None, created_at: Optional[datetime] = None):
        self.story_id = story_id
        self.user_id = user_id
        self.image_url = image_url
        self.content = content
        self.latitude = latitude
        self.longitude = longitude
        self.likes = likes
        self.created_at = created_at