// 로그인 상태 확인
export const checkAuthStatus = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return !!(token && user);
};

// 사용자 정보 가져오기
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// 토큰 가져오기
export const getToken = () => {
  return localStorage.getItem('token');
};

// 로그인 정보 저장
export const saveAuthData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

// 로그아웃
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};