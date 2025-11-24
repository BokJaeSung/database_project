from Service.review_service import ReviewService

class ReviewController:
    def __init__(self):
        self.review_service = ReviewService()
    
    def create_review(self):
        # TODO: 리뷰 생성 컨트롤러 로직 구현
        pass
    
    def get_review_details(self):
        # TODO: 리뷰 상세 조회 컨트롤러 로직 구현
        pass
    
    def get_place_reviews(self):
        # TODO: 장소별 리뷰 조회 컨트롤러 로직 구현
        pass
    
    def get_user_reviews(self):
        # TODO: 사용자별 리뷰 조회 컨트롤러 로직 구현
        pass
    
    def update_review(self):
        # TODO: 리뷰 수정 컨트롤러 로직 구현
        pass
    
    def delete_review(self):
        # TODO: 리뷰 삭제 컨트롤러 로직 구현
        pass