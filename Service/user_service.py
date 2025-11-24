from database import db_connection

class UserService:
    def __init__(self):
        self.db = db_connection
    
    def create_user(self, user_data):
        # TODO: 사용자 생성 로직 구현
        pass
    
    def get_user_by_id(self, user_id):
        # TODO: ID로 사용자 조회 로직 구현
        pass
    
    def get_user_by_login_id(self, login_id):
        # TODO: 로그인 ID로 사용자 조회 로직 구현
        pass
    
    def update_user(self, user_id, user_data):
        # TODO: 사용자 정보 수정 로직 구현
        pass
    
    def delete_user(self, user_id):
        # TODO: 사용자 삭제 로직 구현
        pass
    
    def authenticate_user(self, login_id, password):
        # TODO: 사용자 인증 로직 구현
        pass