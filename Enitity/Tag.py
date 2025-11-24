from typing import Optional

class Tag:
    def __init__(self, tag_id: Optional[int] = None, name: str = None):
        self.tag_id = tag_id
        self.name = name