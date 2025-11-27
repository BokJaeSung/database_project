from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from Service.review_service import ReviewService

router = APIRouter(prefix="/reviews", tags=["reviews"])
review_service = ReviewService()

class ReviewCreate(BaseModel):
    user_id: int
    place_id: int
    title: str
    content: str
    rating: float

class ReviewUpdate(BaseModel):
    title: str
    content: str
    rating: float

@router.post("")
def create_review(review_data: ReviewCreate):
    result = review_service.create_review(review_data.model_dump())
    if result:
        return {"message": "Review created successfully"}
    raise HTTPException(status_code=400, detail="Failed to create review")

@router.get("/{review_id}")
def get_review_details(review_id: int):
    review = review_service.get_review_by_id(review_id)
    if review:
        return review.__dict__
    raise HTTPException(status_code=404, detail="Review not found")

@router.get("/place/{place_id}")
def get_place_reviews(place_id: int):
    reviews = review_service.get_reviews_by_place(place_id)
    return [review.__dict__ for review in reviews]

@router.get("/user/{user_id}")
def get_user_reviews(user_id: int):
    reviews = review_service.get_reviews_by_user(user_id)
    return [review.__dict__ for review in reviews]

@router.put("/{review_id}")
def update_review(review_id: int, review_data: ReviewUpdate):
    result = review_service.update_review(review_id, review_data.model_dump())
    if result:
        return {"message": "Review updated successfully"}
    raise HTTPException(status_code=404, detail="Review not found")

@router.delete("/{review_id}")
def delete_review(review_id: int):
    result = review_service.delete_review(review_id)
    if result:
        return {"message": "Review deleted successfully"}
    raise HTTPException(status_code=404, detail="Review not found")