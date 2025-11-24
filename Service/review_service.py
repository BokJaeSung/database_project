from database import db_connection

class ReviewService:
    def __init__(self):
        self.db = db_connection
    
    def create_review(self, review_data):
        # TODO: 리뷰 생성 로직 구현
        pass
    
    def get_review_by_id(self, review_id):
        # TODO: ID로 리뷰 조회 로직 구현
        pass
    
    def get_reviews_by_place(self, place_id):
        # TODO: 장소별 리뷰 조회 로직 구현
        pass
    
    def get_reviews_by_user(self, user_id):
        # TODO: 사용자별 리뷰 조회 로직 구현
        pass
    
    def update_review(self, review_id, review_data):
        # TODO: 리뷰 수정 로직 구현
        pass
    
    def delete_review(self, review_id):
        # TODO: 리뷰 삭제 로직 구현
        pass