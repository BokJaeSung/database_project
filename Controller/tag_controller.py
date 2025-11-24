from Service.tag_service import TagService

class TagController:
    def __init__(self):
        self.tag_service = TagService()
    
    def create_tag(self):
        # TODO: 태그 생성 컨트롤러 로직 구현
        pass
    
    def get_all_tags(self):
        # TODO: 모든 태그 조회 컨트롤러 로직 구현
        pass
    
    def add_story_tag(self):
        # TODO: 스토리에 태그 추가 컨트롤러 로직 구현
        pass
    
    def remove_story_tag(self):
        # TODO: 스토리에서 태그 제거 컨트롤러 로직 구현
        pass
    
    def get_story_tags(self):
        # TODO: 스토리별 태그 조회 컨트롤러 로직 구현
        pass
    
    def search_stories_by_tag(self):
        # TODO: 태그별 스토리 검색 컨트롤러 로직 구현
        pass