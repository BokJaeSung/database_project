from datetime import datetime
from typing import Optional

class User_t:
    def __init__(self, user_id: Optional[int] = None, id: str = None, password: str = None, 
                 name: Optional[str] = None, email: Optional[str] = None, 
                 created_at: Optional[datetime] = None):
        self.user_id = user_id
        self.id = id
        self.password = password
        self.name = name
        self.email = email
        self.created_at = created_at