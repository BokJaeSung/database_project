from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from Service.comment_service import CommentService

router = APIRouter(prefix="/comments", tags=["comments"])
comment_service = CommentService()

class CommentCreate(BaseModel):
    user_id: int
    review_id: int
    content: str

class CommentUpdate(BaseModel):
    content: str

@router.post("")
def create_comment(comment_data: CommentCreate):
    result = comment_service.create_comment(comment_data.model_dump())
    if result:
        return {"message": "Comment created successfully"}
    raise HTTPException(status_code=400, detail="Failed to create comment")

@router.get("/{comment_id}")
def get_comment_details(comment_id: int):
    comment = comment_service.get_comment_by_id(comment_id)
    if comment:
        return comment.__dict__
    raise HTTPException(status_code=404, detail="Comment not found")

@router.get("/review/{review_id}")
def get_review_comments(review_id: int):
    comments = comment_service.get_comments_by_review(review_id)
    return [comment.__dict__ for comment in comments]

@router.get("/user/{user_id}")
def get_user_comments(user_id: int):
    comments = comment_service.get_comments_by_user(user_id)
    return [comment.__dict__ for comment in comments]

@router.put("/{comment_id}")
def update_comment(comment_id: int, comment_data: CommentUpdate):
    result = comment_service.update_comment(comment_id, comment_data.model_dump())
    if result:
        return {"message": "Comment updated successfully"}
    raise HTTPException(status_code=404, detail="Comment not found")

@router.delete("/{comment_id}")
def delete_comment(comment_id: int):
    result = comment_service.delete_comment(comment_id)
    if result:
        return {"message": "Comment deleted successfully"}
    raise HTTPException(status_code=404, detail="Comment not found")