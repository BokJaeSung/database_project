from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from Service.tag_service import TagService

router = APIRouter(prefix="/tags", tags=["tags"])
tag_service = TagService()

class TagCreate(BaseModel):
    name: str

class StoryTagAdd(BaseModel):
    tag_id: int

@router.post("")
def create_tag(tag_data: TagCreate):
    result = tag_service.create_tag(tag_data.model_dump())
    if result:
        return {"message": "Tag created successfully"}
    raise HTTPException(status_code=400, detail="Failed to create tag")

@router.get("")
def get_all_tags():
    tags = tag_service.get_all_tags()
    return [tag.__dict__ for tag in tags]

@router.get("/{tag_id}")
def get_tag_details(tag_id: int):
    tag = tag_service.get_tag_by_id(tag_id)
    if tag:
        return tag.__dict__
    raise HTTPException(status_code=404, detail="Tag not found")

@router.post("/story/{story_id}")
def add_story_tag(story_id: int, tag_data: StoryTagAdd):
    result = tag_service.add_story_tag(story_id, tag_data.tag_id)
    if result:
        return {"message": "Tag added to story successfully"}
    raise HTTPException(status_code=400, detail="Failed to add tag to story")

@router.delete("/story/{story_id}/tag/{tag_id}")
def remove_story_tag(story_id: int, tag_id: int):
    result = tag_service.remove_story_tag(story_id, tag_id)
    if result:
        return {"message": "Tag removed from story successfully"}
    raise HTTPException(status_code=404, detail="Tag not found in story")

@router.get("/story/{story_id}")
def get_story_tags(story_id: int):
    tags = tag_service.get_story_tags(story_id)
    return [tag.__dict__ for tag in tags]

@router.get("/{tag_id}/stories")
def search_stories_by_tag(tag_id: int):
    story_ids = tag_service.get_stories_by_tag(tag_id)
    return {"tag_id": tag_id, "story_ids": story_ids}