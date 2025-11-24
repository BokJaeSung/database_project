from Service.like_service import LikeService

class LikeController:
    def __init__(self):
        self.like_service = LikeService()
    
    def toggle_like(self):
        # TODO: 좋아요 토글 컨트롤러 로직 구현
        pass
    
    def get_story_likes(self):
        # TODO: 스토리별 좋아요 조회 컨트롤러 로직 구현
        pass
    
    def get_user_likes(self):
        # TODO: 사용자별 좋아요 조회 컨트롤러 로직 구현
        pass