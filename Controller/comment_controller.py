from fastapi import APIRouter
from Service.comment_service import CommentService

router = APIRouter(prefix="/comments", tags=["comments"])

class CommentController:
    def __init__(self):
        self.comment_service = CommentService()
    
    @router.post("")
    def create_comment(self):
        # TODO: 댓글 생성 컨트롤러 로직 구현
        pass
    
    @router.get("/review/{review_id}")
    def get_review_comments(self, review_id: int):
        # TODO: 리뷰별 댓글 조회 컨트롤러 로직 구현
        pass
    
    @router.get("/user/{user_id}")
    def get_user_comments(self, user_id: int):
        # TODO: 사용자별 댓글 조회 컨트롤러 로직 구현
        pass
    
    @router.put("/{comment_id}")
    def update_comment(self, comment_id: int):
        # TODO: 댓글 수정 컨트롤러 로직 구현
        pass
    
    @router.delete("/{comment_id}")
    def delete_comment(self, comment_id: int):
        # TODO: 댓글 삭제 컨트롤러 로직 구현
        pass