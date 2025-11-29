import React, { useState } from 'react';
import { authAPI } from '../services/api';
import { saveAuthData } from '../utils/auth';
import RegisterPage from './RegisterPage';

function LoginPage({ onLogin, onBackToMap }) {
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData.id, formData.password);
      
      if (response.success) {
        // 로그인 성공
        saveAuthData(response.token, {
          user_id: response.user_id,
          name: response.name,
          id: formData.id
        });
        onLogin();
      } else {
        setError(response.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showRegister) {
    return (
      <RegisterPage 
        onRegisterSuccess={() => setShowRegister(false)}
        onBackToLogin={() => setShowRegister(false)}
      />
    );
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Location Story</h2>
        <h3>로그인</h3>
        
        {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
        
        <input
          type="text"
          name="id"
          placeholder="아이디"
          value={formData.id}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
        
        <p style={{textAlign: 'center', marginTop: '20px'}}>
          계정이 없으신가요? 
          <button 
            type="button" 
            onClick={() => setShowRegister(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#007bff',
              textDecoration: 'underline',
              cursor: 'pointer',
              marginLeft: '5px'
            }}
          >
            회원가입
          </button>
        </p>
        
        {onBackToMap && (
          <p style={{textAlign: 'center', marginTop: '10px'}}>
            <button 
              type="button" 
              onClick={onBackToMap}
              style={{
                background: 'none',
                border: 'none',
                color: '#6c757d',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              로그인 없이 맵 보기
            </button>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPage;