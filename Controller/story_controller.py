from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from Service.story_service import StoryService

router = APIRouter(prefix="/stories", tags=["stories"])
story_service = StoryService()

class StoryCreate(BaseModel):
    user_id: int
    image_url: str
    content: str
    latitude: float
    longitude: float

class StoryUpdate(BaseModel):
    content: str
    image_url: str

@router.post("")
def create_story(story_data: StoryCreate):
    result = story_service.create_story(story_data.model_dump())
    if result:
        return {"message": "Story created successfully"}
    raise HTTPException(status_code=400, detail="Failed to create story")

@router.get("/{story_id}")
def get_story_details(story_id: int):
    story = story_service.get_story_by_id(story_id)
    if story:
        return story.__dict__
    raise HTTPException(status_code=404, detail="Story not found")

@router.get("/location/search")
def get_stories_by_location(
    latitude: float = Query(...), 
    longitude: float = Query(...), 
    radius: float = Query(1.0)
):
    stories = story_service.get_stories_by_location(latitude, longitude, radius)
    return [story.__dict__ for story in stories]

@router.get("/user/{user_id}")
def get_user_stories(user_id: int):
    stories = story_service.get_stories_by_user(user_id)
    return [story.__dict__ for story in stories]

@router.put("/{story_id}")
def update_story(story_id: int, story_data: StoryUpdate):
    result = story_service.update_story(story_id, story_data.model_dump())
    if result:
        return {"message": "Story updated successfully"}
    raise HTTPException(status_code=404, detail="Story not found")

@router.delete("/{story_id}")
def delete_story(story_id: int):
    result = story_service.delete_story(story_id)
    if result:
        return {"message": "Story deleted successfully"}
    raise HTTPException(status_code=404, detail="Story not found")

@router.put("/{story_id}/likes")
def update_story_likes(story_id: int):
    result = story_service.update_likes_count(story_id)
    if result:
        return {"message": "Story likes updated successfully"}
    raise HTTPException(status_code=404, detail="Story not found")