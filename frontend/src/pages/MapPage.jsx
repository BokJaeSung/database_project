import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import StoryCard from '../components/StoryCard';
import { getCurrentUser } from '../utils/auth';

function MapPage({ onLogout, onShowLogin, isLoggedIn }) {
  const [stories, setStories] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleStoriesUpdate = (newStories) => {
    setStories(newStories);
  };

  const handleStoryCreate = (newStory) => {
    setStories(prevStories => [newStory, ...prevStories]);
  };

  return (
    <div className="map-page">
      {/* 헤더 */}
      <header style={{
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1>Location Story</h1>
        <div>
          {isLoggedIn ? (
            <>
              <span>안녕하세요, {currentUser?.name}님!</span>
              <button 
                onClick={onLogout}
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <span>게스트 모드</span>
              <button 
                onClick={onShowLogin}
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                로그인
              </button>
            </>
          )}
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <div style={{ display: 'flex', height: 'calc(100vh - 70px)' }}>
        {/* 맵 영역 */}
        <div style={{ flex: 1 }}>
          <Map 
            onStoriesUpdate={handleStoriesUpdate}
            onStoryCreate={handleStoryCreate}
            isLoggedIn={isLoggedIn}
          />
        </div>

        {/* 스토리 목록 영역 */}
        <div style={{
          width: '400px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          overflowY: 'auto'
        }}>
          <h3>주변 스토리</h3>
          {stories.length === 0 ? (
            <p>이 지역에 스토리가 없습니다.</p>
          ) : (
            stories.map(story => (
              <StoryCard 
                key={story.story_id} 
                story={story}
                currentUser={currentUser}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MapPage;