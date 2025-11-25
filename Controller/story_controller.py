from fastapi import APIRouter
from Service.story_service import StoryService

router = APIRouter(prefix="/stories", tags=["stories"])

class StoryController:
    def __init__(self):
        self.story_service = StoryService()
    
    @router.post("")
    def create_story(self):
        # TODO: 스토리 생성 컨트롤러 로직 구현
        pass
    
    @router.get("/{story_id}")
    def get_story_details(self, story_id: int):
        # TODO: 스토리 상세 조회 컨트롤러 로직 구현
        pass
    
    @router.get("/location")
    def get_stories_by_location(self):
        # TODO: 위치 기반 스토리 조회 컨트롤러 로직 구현
        pass
    
    @router.get("/user/{user_id}")
    def get_user_stories(self, user_id: int):
        # TODO: 사용자별 스토리 조회 컨트롤러 로직 구현
        pass
    
    @router.put("/{story_id}")
    def update_story(self, story_id: int):
        # TODO: 스토리 수정 컨트롤러 로직 구현
        pass
    
    @router.delete("/{story_id}")
    def delete_story(self, story_id: int):
        # TODO: 스토리 삭제 컨트롤러 로직 구현
        pass