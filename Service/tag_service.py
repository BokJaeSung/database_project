from database import db_connection

class TagService:
    def __init__(self):
        self.db = db_connection
    
    def create_tag(self, tag_name):
        # TODO: 태그 생성 로직 구현
        pass
    
    def get_tag_by_id(self, tag_id):
        # TODO: ID로 태그 조회 로직 구현
        pass
    
    def get_tag_by_name(self, tag_name):
        # TODO: 이름으로 태그 조회 로직 구현
        pass
    
    def get_all_tags(self):
        # TODO: 모든 태그 조회 로직 구현
        pass
    
    def add_story_tag(self, story_id, tag_id):
        # TODO: 스토리-태그 연결 로직 구현
        pass
    
    def remove_story_tag(self, story_id, tag_id):
        # TODO: 스토리-태그 연결 해제 로직 구현
        pass
    
    def get_tags_by_story(self, story_id):
        # TODO: 스토리별 태그 조회 로직 구현
        pass
    
    def get_stories_by_tag(self, tag_id):
        # TODO: 태그별 스토리 조회 로직 구현
        pass