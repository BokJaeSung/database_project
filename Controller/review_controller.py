from fastapi import APIRouter
from Service.review_service import ReviewService

router = APIRouter(prefix="/reviews", tags=["reviews"])

class ReviewController:
    def __init__(self):
        self.review_service = ReviewService()
    
    @router.post("")
    def create_review(self):
        # TODO: 리뷰 생성 컨트롤러 로직 구현
        pass
    
    @router.get("/{review_id}")
    def get_review_details(self, review_id: int):
        # TODO: 리뷰 상세 조회 컨트롤러 로직 구현
        pass
    
    @router.get("/place/{place_id}")
    def get_place_reviews(self, place_id: int):
        # TODO: 장소별 리뷰 조회 컨트롤러 로직 구현
        pass
    
    @router.get("/user/{user_id}")
    def get_user_reviews(self, user_id: int):
        # TODO: 사용자별 리뷰 조회 컨트롤러 로직 구현
        pass
    
    @router.put("/{review_id}")
    def update_review(self, review_id: int):
        # TODO: 리뷰 수정 컨트롤러 로직 구현
        pass
    
    @router.delete("/{review_id}")
    def delete_review(self, review_id: int):
        # TODO: 리뷰 삭제 컨트롤러 로직 구현
        pass