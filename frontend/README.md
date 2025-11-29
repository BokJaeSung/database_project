# Location Story Frontend

위치 기반 스토리 공유 앱의 프론트엔드입니다.

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 카카오맵 API 키 설정
`public/index.html` 파일에서 `YOUR_KAKAO_MAP_API_KEY`를 실제 API 키로 변경하세요.

### 3. 개발 서버 실행
```bash
npm start
```
- 프론트엔드: http://localhost:3000
- 백엔드가 http://localhost:8000에서 실행 중이어야 합니다.

## 주요 기능

### 🗺️ 맵 기능
- 카카오맵 기반 지도 표시
- 맵 이동 시 주변 스토리 자동 로드
- 맵 클릭으로 스토리 작성

### 📝 스토리 기능
- 위치 기반 스토리 작성
- 스토리 목록 표시
- 좋아요 기능

### 🔐 인증 기능
- 로그인/로그아웃
- 토큰 기반 인증
- 자동 로그인 상태 유지

## 프로젝트 구조

```
src/
├── components/          # 재사용 컴포넌트
│   ├── Map.jsx         # 카카오맵 컴포넌트
│   └── StoryCard.jsx   # 스토리 카드
├── pages/              # 페이지 컴포넌트
│   ├── MapPage.jsx     # 메인 맵 화면
│   └── LoginPage.jsx   # 로그인 화면
├── services/           # API 서비스
│   └── api.js          # 백엔드 API 호출
├── utils/              # 유틸리티
│   └── auth.js         # 인증 관련 함수
├── App.jsx             # 메인 앱 컴포넌트
└── index.js            # 진입점
```

## API 연동

백엔드 API와 연동하여 다음 기능을 제공합니다:

- 사용자 인증 (로그인/회원가입)
- 위치 기반 스토리 조회
- 스토리 작성/수정/삭제
- 좋아요 기능

## 환경 설정

### 백엔드 서버 주소 변경
`src/services/api.js`에서 `API_BASE_URL`을 수정하세요.

### 프록시 설정
개발 시 CORS 문제를 피하기 위해 `package.json`에 프록시가 설정되어 있습니다.

## 빌드 및 배포

### 프로덕션 빌드
```bash
npm run build
```

### 백엔드와 통합 배포
```bash
# 빌드 후 백엔드 static 폴더로 복사
npm run build
cp -r build/* ../static/
```

## 주의사항

1. 카카오맵 API 키가 필요합니다.
2. 백엔드 서버가 실행 중이어야 합니다.
3. 백엔드에서 CORS 설정이 필요합니다.

## 개발 팁

- React Developer Tools 사용 권장
- 브라우저 개발자 도구에서 localStorage 확인 가능
- API 호출 에러는 Network 탭에서 확인