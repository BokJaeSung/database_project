import React, { useState } from 'react';
import { likeAPI } from '../services/api';

function StoryCard({ story, currentUser }) {
  const [likes, setLikes] = useState(story.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLikeToggle = async () => {
    if (!currentUser) {
      alert('로그인이 필요합니다.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await likeAPI.toggleLike(story.story_id);
      
      if (response.success) {
        setIsLiked(response.liked);
        setLikes(response.total_likes);
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
      alert('좋아요 처리에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="story-card">
      {/* 작성자 정보 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <strong>{story.user_name || '익명'}</strong>
        <small style={{ color: '#666' }}>
          {story.created_at && formatDate(story.created_at)}
        </small>
      </div>

      {/* 이미지 */}
      {story.image_url && (
        <img 
          src={story.image_url} 
          alt="Story" 
          style={{
            width: '100%',
            maxHeight: '200px',
            objectFit: 'cover',
            borderRadius: '4px',
            marginBottom: '10px'
          }}
        />
      )}

      {/* 내용 */}
      <p style={{ 
        margin: '10px 0',
        lineHeight: '1.4',
        wordBreak: 'break-word'
      }}>
        {story.content}
      </p>

      {/* 위치 정보 */}
      <div style={{
        fontSize: '12px',
        color: '#666',
        marginBottom: '10px'
      }}>
        📍 위도: {story.latitude?.toFixed(4)}, 경도: {story.longitude?.toFixed(4)}
      </div>

      {/* 좋아요 버튼 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button
          onClick={handleLikeToggle}
          disabled={isLoading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '5px 10px',
            border: 'none',
            borderRadius: '20px',
            backgroundColor: isLiked ? '#ff6b6b' : '#f1f3f4',
            color: isLiked ? 'white' : '#333',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '14px'
          }}
        >
          {isLiked ? '❤️' : '🤍'} {likes}
        </button>

        {/* 수정/삭제 버튼 (본인 스토리인 경우) */}
        {currentUser && story.user_id === currentUser.user_id && (
          <div style={{ display: 'flex', gap: '5px' }}>
            <button
              style={{
                padding: '3px 8px',
                fontSize: '12px',
                border: '1px solid #ddd',
                borderRadius: '3px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              수정
            </button>
            <button
              style={{
                padding: '3px 8px',
                fontSize: '12px',
                border: '1px solid #dc3545',
                borderRadius: '3px',
                backgroundColor: '#dc3545',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoryCard;