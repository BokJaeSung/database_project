from datetime import datetime
from typing import Optional

class Review:
    def __init__(self, review_id: Optional[int] = None, user_id: Optional[int] = None, 
                 place_id: int = None, title: Optional[str] = None, 
                 content: Optional[str] = None, rating: Optional[float] = None, 
                 created_at: Optional[datetime] = None):
        self.review_id = review_id
        self.user_id = user_id
        self.place_id = place_id
        self.title = title
        self.content = content
        self.rating = rating
        self.created_at = created_at