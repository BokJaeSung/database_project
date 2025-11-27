from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from Service.place_service import PlaceService

router = APIRouter(prefix="/places", tags=["places"])
place_service = PlaceService()

class PlaceCreate(BaseModel):
    name: str
    latitude: float
    longitude: float

class PlaceUpdate(BaseModel):
    name: str
    latitude: float
    longitude: float

@router.post("")
def create_place(place_data: PlaceCreate):
    result = place_service.create_place(place_data.model_dump())
    if result:
        return {"message": "Place created successfully"}
    raise HTTPException(status_code=400, detail="Failed to create place")

@router.get("/{place_id}")
def get_place_details(place_id: int):
    place = place_service.get_place_by_id(place_id)
    if place:
        return place.__dict__
    raise HTTPException(status_code=404, detail="Place not found")

@router.get("/search/location")
def search_places_by_location(
    latitude: float = Query(...), 
    longitude: float = Query(...), 
    radius: float = Query(1.0)
):
    places = place_service.get_places_by_location(latitude, longitude, radius)
    return [place.__dict__ for place in places]

@router.put("/{place_id}")
def update_place_info(place_id: int, place_data: PlaceUpdate):
    result = place_service.update_place(place_id, place_data.model_dump())
    if result:
        return {"message": "Place updated successfully"}
    raise HTTPException(status_code=404, detail="Place not found")

@router.delete("/{place_id}")
def delete_place(place_id: int):
    result = place_service.delete_place(place_id)
    if result:
        return {"message": "Place deleted successfully"}
    raise HTTPException(status_code=404, detail="Place not found")

@router.put("/{place_id}/rating")
def update_place_rating(place_id: int):
    result = place_service.update_average_rating(place_id)
    if result:
        return {"message": "Place rating updated successfully"}
    raise HTTPException(status_code=404, detail="Place not found")