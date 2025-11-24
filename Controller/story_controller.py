from Service.story_service import StoryService

class StoryController:
    def __init__(self):
        self.story_service = StoryService()
    
    def create_story(self):
        # TODO: 스토리 생성 컨트롤러 로직 구현
        pass
    
    def get_story_details(self):
        # TODO: 스토리 상세 조회 컨트롤러 로직 구현
        pass
    
    def get_stories_by_location(self):
        # TODO: 위치 기반 스토리 조회 컨트롤러 로직 구현
        pass
    
    def get_user_stories(self):
        # TODO: 사용자별 스토리 조회 컨트롤러 로직 구현
        pass
    
    def update_story(self):
        # TODO: 스토리 수정 컨트롤러 로직 구현
        pass
    
    def delete_story(self):
        # TODO: 스토리 삭제 컨트롤러 로직 구현
        pass