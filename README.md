# Database Project - RESTful API Server

## 프로젝트 구조
```
database_project/
├── Controller/     # API 엔드포인트 (FastAPI 라우터)
├── Service/        # 비즈니스 로직 (CRUD 메서드)
├── Enitity/        # 데이터 모델 클래스
├── main.py         # FastAPI 애플리케이션 진입점
├── database.py     # Oracle DB 연결 설정
└── requirements.txt
```

## 설치 및 실행

### 1. 패키지 설치
```bash
pip install -r requirements.txt
```

### 2. 데이터베이스 설정
database.py 파일에서 Oracle DB 연결 정보 수정:
- host: localhost
- port: 1521
- service_name: orcl
- username: team14_user (실제 사용자명으로 변경)
- password: team14_password (실제 비밀번호로 변경)

### 3. 서버 실행
```bash
# 방법 1: uvicorn 직접 실행
uvicorn main:app --reload

# 방법 2: Python으로 실행
python main.py
```

### 4. API 테스트
- 서버 주소: http://localhost:8000
- API 문서: http://localhost:8000/docs (Swagger UI)
- ReDoc 문서: http://localhost:8000/redoc

## API 엔드포인트

### Users (사용자)
- `POST /users/register` - 회원가입
- `POST /users/login` - 로그인
- `GET /users/{user_id}` - 사용자 조회
- `PUT /users/{user_id}` - 사용자 정보 수정
- `DELETE /users/{user_id}` - 사용자 삭제

### Places (장소)
- `POST /places` - 장소 생성
- `GET /places/{place_id}` - 장소 조회
- `GET /places/search/location` - 위치 기반 장소 검색
- `PUT /places/{place_id}` - 장소 정보 수정
- `DELETE /places/{place_id}` - 장소 삭제

### Reviews (리뷰)
- `POST /reviews` - 리뷰 생성
- `GET /reviews/{review_id}` - 리뷰 조회
- `GET /reviews/place/{place_id}` - 장소별 리뷰 목록
- `GET /reviews/user/{user_id}` - 사용자별 리뷰 목록
- `PUT /reviews/{review_id}` - 리뷰 수정
- `DELETE /reviews/{review_id}` - 리뷰 삭제

### Stories (스토리)
- `POST /stories` - 스토리 생성
- `GET /stories/{story_id}` - 스토리 조회
- `GET /stories/location/search` - 위치 기반 스토리 검색
- `GET /stories/user/{user_id}` - 사용자별 스토리 목록
- `PUT /stories/{story_id}` - 스토리 수정
- `DELETE /stories/{story_id}` - 스토리 삭제

### Comments (댓글)
- `POST /comments` - 댓글 생성
- `GET /comments/{comment_id}` - 댓글 조회
- `GET /comments/review/{review_id}` - 리뷰별 댓글 목록
- `GET /comments/user/{user_id}` - 사용자별 댓글 목록
- `PUT /comments/{comment_id}` - 댓글 수정
- `DELETE /comments/{comment_id}` - 댓글 삭제

### Likes (좋아요)
- `POST /likes/toggle` - 좋아요 토글
- `GET /likes/story/{story_id}` - 스토리별 좋아요 목록
- `GET /likes/user/{user_id}` - 사용자별 좋아요 목록
- `GET /likes/story/{story_id}/count` - 스토리 좋아요 수
- `GET /likes/check/{user_id}/{story_id}` - 좋아요 상태 확인

### Tags (태그)
- `POST /tags` - 태그 생성
- `GET /tags` - 모든 태그 목록
- `GET /tags/{tag_id}` - 태그 조회
- `POST /tags/story/{story_id}` - 스토리에 태그 추가
- `DELETE /tags/story/{story_id}/tag/{tag_id}` - 스토리에서 태그 제거
- `GET /tags/story/{story_id}` - 스토리별 태그 목록
- `GET /tags/{tag_id}/stories` - 태그별 스토리 목록

## 테스트 방법
1. 서버 실행 후 http://localhost:8000/docs 접속
2. Swagger UI에서 각 API 테스트 가능
3. 먼저 사용자 등록 → 로그인 → 다른 API 테스트 순서로 진행

## 주의사항
- Oracle DB가 실행 중이어야 함
- 테이블이 미리 생성되어 있어야 함
- 테이블명은 대문자로 작성 (USER_T, PLACE, REVIEW, STORY, COMMENT_T, LIKE_T, TAG, STORY_TAG)