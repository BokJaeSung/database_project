import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 에러 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 로그아웃
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

// 인증 관련 API
export const authAPI = {
  login: async (id, password) => {
    const response = await api.post('/users/login', { id, password });
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  }
};

// 스토리 관련 API
export const storyAPI = {
  getNearbyStories: async (lat, lng, radius = 1) => {
    const response = await api.get(`/stories/location/search?lat=${lat}&lng=${lng}&radius=${radius}`);
    return response.data;
  },
  
  createStory: async (storyData) => {
    const response = await api.post('/stories', storyData);
    return response.data;
  },
  
  getStoryById: async (storyId) => {
    const response = await api.get(`/stories/${storyId}`);
    return response.data;
  },
  
  updateStory: async (storyId, storyData) => {
    const response = await api.put(`/stories/${storyId}`, storyData);
    return response.data;
  },
  
  deleteStory: async (storyId) => {
    const response = await api.delete(`/stories/${storyId}`);
    return response.data;
  }
};

// 좋아요 관련 API
export const likeAPI = {
  toggleLike: async (storyId) => {
    const response = await api.post('/likes/toggle', { story_id: storyId });
    return response.data;
  },
  
  getLikeCount: async (storyId) => {
    const response = await api.get(`/likes/story/${storyId}/count`);
    return response.data;
  },
  
  checkLikeStatus: async (userId, storyId) => {
    const response = await api.get(`/likes/check/${userId}/${storyId}`);
    return response.data;
  }
};

// 장소 관련 API
export const placeAPI = {
  searchNearbyPlaces: async (lat, lng, radius = 1) => {
    const response = await api.get(`/places/search/location?lat=${lat}&lng=${lng}&radius=${radius}`);
    return response.data;
  },
  
  createPlace: async (placeData) => {
    const response = await api.post('/places', placeData);
    return response.data;
  }
};

export default api;