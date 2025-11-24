from database import db_connection

class CommentService:
    def __init__(self):
        self.db = db_connection
    
    def create_comment(self, comment_data):
        # TODO: 댓글 생성 로직 구현
        pass
    
    def get_comment_by_id(self, comment_id):
        # TODO: ID로 댓글 조회 로직 구현
        pass
    
    def get_comments_by_review(self, review_id):
        # TODO: 리뷰별 댓글 조회 로직 구현
        pass
    
    def get_comments_by_user(self, user_id):
        # TODO: 사용자별 댓글 조회 로직 구현
        pass
    
    def update_comment(self, comment_id, comment_data):
        # TODO: 댓글 수정 로직 구현
        pass
    
    def delete_comment(self, comment_id):
        # TODO: 댓글 삭제 로직 구현
        pass