import React, { useState, useEffect } from 'react';
import MapPage from './pages/MapPage';
import LoginPage from './pages/LoginPage';
import { checkAuthStatus } from './utils/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 페이지 로드 시 로그인 상태 확인
    const authStatus = checkAuthStatus();
    setIsLoggedIn(authStatus);
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {showLogin && !isLoggedIn ? (
        <LoginPage onLogin={handleLogin} onBackToMap={() => setShowLogin(false)} />
      ) : (
        <MapPage 
          onLogout={handleLogout} 
          onShowLogin={handleShowLogin}
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  );
}

export default App;