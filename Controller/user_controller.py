from fastapi import APIRouter
from Service.user_service import UserService

router = APIRouter(prefix="/users", tags=["users"])

class UserController:
    def __init__(self):
        self.user_service = UserService()

    @router.post("/register")
    def register_user(self):
        # TODO: 사용자 등록 컨트롤러 로직 구현
        pass
    
    @router.post("/login")
    def login_user(self):
        # TODO: 사용자 로그인 컨트롤러 로직 구현
        pass
    
    @router.get("/profile")
    def get_user_profile(self):
        # TODO: 사용자 프로필 조회 컨트롤러 로직 구현
        pass
    
    @router.put("/profile")
    def update_user_profile(self):
        # TODO: 사용자 프로필 수정 컨트롤러 로직 구현
        pass
    
    @router.delete("/account")
    def delete_user_account(self):
        # TODO: 사용자 계정 삭제 컨트롤러 로직 구현
        pass