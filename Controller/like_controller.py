from fastapi import APIRouter
from Service.like_service import LikeService

router = APIRouter(prefix="/likes", tags=["likes"])

class LikeController:
    def __init__(self):
        self.like_service = LikeService()
    
    @router.post("/toggle")
    def toggle_like(self):
        # TODO: 좋아요 토글 컨트롤러 로직 구현
        pass
    
    @router.get("/story/{story_id}")
    def get_story_likes(self, story_id: int):
        # TODO: 스토리별 좋아요 조회 컨트롤러 로직 구현
        pass
    
    @router.get("/user/{user_id}")
    def get_user_likes(self, user_id: int):
        # TODO: 사용자별 좋아요 조회 컨트롤러 로직 구현
        pass