# 프론트엔드 필수 API 요구사항

## 🔴 최우선 (앱 기본 동작)

### 1. 사용자 인증
```
POST /api/users/login
Request: { "id": "user1", "password": "1234" }
Response: { "success": true, "user_id": 123, "token": "jwt_token", "name": "홍길동" }
```

### 2. 맵 중심 스토리 조회 (핵심 기능)
```
GET /api/stories/location/search?lat=37.5665&lng=126.9780&radius=1
Response: {
  "stories": [
    {
      "story_id": 1,
      "content": "맛있는 카페!",
      "latitude": 37.5665,
      "longitude": 126.9780,
      "image_url": "image1.jpg",
      "likes": 15,
      "user_name": "김철수",
      "created_at": "2024-01-01T10:00:00Z"
    }
  ]
}
```

### 3. 스토리 작성
```
POST /api/stories
Request: {
  "content": "좋은 장소 발견!",
  "latitude": 37.5665,
  "longitude": 126.9780,
  "image_url": "uploaded_image.jpg"
}
Response: { "success": true, "story_id": 456 }
```

## 🟡 중요 (사용자 참여 기능)

### 4. 좋아요 토글
```
POST /api/likes/toggle
Request: { "story_id": 123 }
Response: { "success": true, "liked": true, "total_likes": 16 }
```

### 5. 스토리 상세 조회
```
GET /api/stories/{story_id}
Response: {
  "story_id": 1,
  "content": "상세 내용",
  "latitude": 37.5665,
  "longitude": 126.9780,
  "image_url": "image.jpg",
  "likes": 15,
  "user_name": "작성자",
  "created_at": "2024-01-01T10:00:00Z"
}
```

### 6. 회원가입
```
POST /api/users/register
Request: {
  "id": "newuser",
  "password": "1234",
  "name": "신규사용자",
  "email": "user@test.com"
}
Response: { "success": true, "user_id": 789 }
```

## 🟢 보조 기능 (추가 편의성)

### 7. 장소 검색
```
GET /api/places/search/location?lat=37.5665&lng=126.9780&radius=1
Response: {
  "places": [
    {
      "place_id": 1,
      "name": "스타벅스 강남점",
      "latitude": 37.5665,
      "longitude": 126.9780,
      "average_rating": 4.5
    }
  ]
}
```

### 8. 사용자별 스토리 목록
```
GET /api/stories/user/{user_id}
Response: { "stories": [...] }
```

### 9. 스토리 수정/삭제
```
PUT /api/stories/{story_id}
Request: { "content": "수정된 내용" }

DELETE /api/stories/{story_id}
Response: { "success": true }
```

## 🔵 선택 기능 (리뷰 시스템)

### 10. 장소 생성 (리뷰 작성 전 필요)
```
POST /api/places
Request: {
  "name": "스타벅스 강남점",
  "latitude": 37.5665,
  "longitude": 126.9780
}
Response: { "success": true, "place_id": 123 }
```

### 11. 장소별 리뷰 목록
```
GET /api/reviews/place/{place_id}
Response: {
  "reviews": [
    {
      "review_id": 1,
      "title": "좋은 카페",
      "content": "커피가 맛있어요",
      "rating": 4.5,
      "user_name": "리뷰어",
      "created_at": "2024-01-01T10:00:00Z"
    }
  ]
}
```

### 12. 리뷰 작성
```
POST /api/reviews
Request: {
  "place_id": 1,
  "title": "맛있는 카페",
  "content": "분위기 좋아요",
  "rating": 4.5
}
Response: { "success": true, "review_id": 456 }
```

### 13. 리뷰별 댓글 목록
```
GET /api/comments/review/{review_id}
Response: {
  "comments": [
    {
      "comment_id": 1,
      "content": "동감합니다!",
      "user_name": "댓글러",
      "created_at": "2024-01-01T10:00:00Z"
    }
  ]
}
```

### 14. 댓글 작성
```
POST /api/comments
Request: { "review_id": 1, "content": "동감합니다!" }
Response: { "success": true, "comment_id": 789 }
```

## 🟣 부가 기능 (태그 시스템)

### 15. 스토리별 태그 목록
```
GET /api/tags/story/{story_id}
Response: {
  "tags": [
    { "tag_id": 1, "name": "카페" },
    { "tag_id": 2, "name": "맛집" }
  ]
}
```

### 16. 스토리에 태그 추가
```
POST /api/tags/story/{story_id}
Request: { "tag_name": "카페" }
Response: { "success": true }
```

### 17. 태그별 스토리 목록
```
GET /api/tags/{tag_id}/stories
Response: { "stories": [...] }
```

### 18. 모든 태그 목록
```
GET /api/tags
Response: {
  "tags": [
    { "tag_id": 1, "name": "카페" },
    { "tag_id": 2, "name": "맛집" }
  ]
}
```

## ⚪ 추가 편의 기능

### 19. 좋아요 상태 확인
```
GET /api/likes/check/{user_id}/{story_id}
Response: { "liked": true }
```

### 20. 좋아요 수 조회
```
GET /api/likes/story/{story_id}/count
Response: { "count": 25 }
```

### 21. 사용자별 좋아요 목록
```
GET /api/likes/user/{user_id}
Response: { "liked_stories": [...] }
```

## 개발 우선순위

1. **1-3번**: 기본 앱 동작 (로그인, 맵, 스토리 작성)
2. **4-6번**: 사용자 참여 기능 (좋아요, 회원가입)
3. **7-9번**: 편의 기능 (검색, 수정/삭제)
4. **10-14번**: 리뷰 시스템 (장소, 리뷰, 댓글)
5. **15-18번**: 태그 시스템
6. **19-21번**: 추가 편의 기능

## DDL 테이블별 API 매핑

- **USER_T**: API 1, 6 (로그인, 회원가입)
- **STORY**: API 2, 3, 5, 8, 9 (스토리 CRUD)
- **PLACE**: API 7, 10 (장소 검색, 생성)
- **REVIEW**: API 11, 12 (리뷰 CRUD)
- **COMMENT_T**: API 13, 14 (댓글 CRUD)
- **LIKE_T**: API 4, 19, 20, 21 (좋아요 관련)
- **TAG, STORY_TAG**: API 15, 16, 17, 18 (태그 시스템)

## 에러 응답 형식 (공통)
```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "사용자에게 보여줄 메시지"
}
```

## 인증 헤더 (로그인 필요한 API)
```
Authorization: Bearer {jwt_token}
```