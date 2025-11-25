from fastapi import FastAPI
from Controller.user_controller import router as user_router
from Controller.place_controller import router as place_router
from Controller.review_controller import router as review_router
from Controller.story_controller import router as story_router
from Controller.comment_controller import router as comment_router
from Controller.like_controller import router as like_router
from Controller.tag_controller import router as tag_router

app = FastAPI()

# 라우터 등록
app.include_router(user_router)
app.include_router(place_router)
app.include_router(review_router)
app.include_router(story_router)
app.include_router(comment_router)
app.include_router(like_router)
app.include_router(tag_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)