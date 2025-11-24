from Service.comment_service import CommentService

class CommentController:
    def __init__(self):
        self.comment_service = CommentService()
    
    def create_comment(self):
        # TODO: 댓글 생성 컨트롤러 로직 구현
        pass
    
    def get_review_comments(self):
        # TODO: 리뷰별 댓글 조회 컨트롤러 로직 구현
        pass
    
    def get_user_comments(self):
        # TODO: 사용자별 댓글 조회 컨트롤러 로직 구현
        pass
    
    def update_comment(self):
        # TODO: 댓글 수정 컨트롤러 로직 구현
        pass
    
    def delete_comment(self):
        # TODO: 댓글 삭제 컨트롤러 로직 구현
        pass