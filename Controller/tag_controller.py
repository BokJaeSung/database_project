from fastapi import APIRouter
from Service.tag_service import TagService

router = APIRouter(prefix="/tags", tags=["tags"])

class TagController:
    def __init__(self):
        self.tag_service = TagService()
    
    @router.post("")
    def create_tag(self):
        # TODO: 태그 생성 컨트롤러 로직 구현
        pass
    
    @router.get("")
    def get_all_tags(self):
        # TODO: 모든 태그 조회 컨트롤러 로직 구현
        pass
    
    @router.post("/story/{story_id}")
    def add_story_tag(self, story_id: int):
        # TODO: 스토리에 태그 추가 컨트롤러 로직 구현
        pass
    
    @router.delete("/story/{story_id}/tag/{tag_id}")
    def remove_story_tag(self, story_id: int, tag_id: int):
        # TODO: 스토리에서 태그 제거 컨트롤러 로직 구현
        pass
    
    @router.get("/story/{story_id}")
    def get_story_tags(self, story_id: int):
        # TODO: 스토리별 태그 조회 컨트롤러 로직 구현
        pass
    
    @router.get("/{tag_id}/stories")
    def search_stories_by_tag(self, tag_id: int):
        # TODO: 태그별 스토리 검색 컨트롤러 로직 구현
        pass