from database import db_connection

class LikeService:
    def __init__(self):
        self.db = db_connection
    
    def add_like(self, user_id, story_id):
        # TODO: 좋아요 추가 로직 구현
        pass
    
    def remove_like(self, user_id, story_id):
        # TODO: 좋아요 제거 로직 구현
        pass
    
    def check_like_exists(self, user_id, story_id):
        # TODO: 좋아요 존재 여부 확인 로직 구현
        pass
    
    def get_likes_by_story(self, story_id):
        # TODO: 스토리별 좋아요 조회 로직 구현
        pass
    
    def get_likes_by_user(self, user_id):
        # TODO: 사용자별 좋아요 조회 로직 구현
        pass