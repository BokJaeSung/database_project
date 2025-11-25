from datetime import datetime
from typing import Optional

class Comment_t:
    def __init__(self, comment_id: Optional[int] = None, user_id: Optional[int] = None, 
                 review_id: int = None, content: str = None, 
                 created_at: Optional[datetime] = None):
        self.comment_id = comment_id
        self.user_id = user_id
        self.review_id = review_id
        self.content = content
        self.created_at = created_at