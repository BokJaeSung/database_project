from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from Service.like_service import LikeService

router = APIRouter(prefix="/likes", tags=["likes"])
like_service = LikeService()

class LikeToggle(BaseModel):
    user_id: int
    story_id: int

@router.post("/toggle")
def toggle_like(like_data: LikeToggle):
    result = like_service.toggle_like(like_data.user_id, like_data.story_id)
    action = "added" if result else "removed"
    return {"message": f"Like {action} successfully", "liked": result}

@router.get("/story/{story_id}")
def get_story_likes(story_id: int):
    likes = like_service.get_story_likes(story_id)
    return [like.__dict__ for like in likes]

@router.get("/user/{user_id}")
def get_user_likes(user_id: int):
    likes = like_service.get_user_likes(user_id)
    return [like.__dict__ for like in likes]

@router.get("/story/{story_id}/count")
def get_story_likes_count(story_id: int):
    count = like_service.get_likes_count(story_id)
    return {"story_id": story_id, "likes_count": count}

@router.get("/check/{user_id}/{story_id}")
def check_user_liked_story(user_id: int, story_id: int):
    is_liked = like_service.is_liked_by_user(user_id, story_id)
    return {"user_id": user_id, "story_id": story_id, "is_liked": is_liked}