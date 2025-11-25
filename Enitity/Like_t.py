from datetime import datetime
from typing import Optional

class Like_t:
    def __init__(self, user_id: int = None, story_id: int = None, 
                 created_at: Optional[datetime] = None):
        self.user_id = user_id
        self.story_id = story_id
        self.created_at = created_at