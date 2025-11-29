import React, { useState } from 'react';
import { authAPI } from '../services/api';

function RegisterPage({ onRegisterSuccess, onBackToLogin }) {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    phone: ''
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

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await authAPI.register({
        id: formData.id,
        password: formData.password,
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      
      if (response.success) {
        alert('회원가입이 완료되었습니다!');
        onRegisterSuccess();
      } else {
        setError(response.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('Register error:', error);
      setError('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Location Story</h2>
        <h3>회원가입</h3>
        
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
        
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <input
          type="tel"
          name="phone"
          placeholder="전화번호"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? '가입 중...' : '회원가입'}
        </button>
        
        <p style={{textAlign: 'center', marginTop: '20px'}}>
          이미 계정이 있으신가요? 
          <button 
            type="button" 
            onClick={onBackToLogin}
            style={{
              background: 'none',
              border: 'none',
              color: '#007bff',
              textDecoration: 'underline',
              cursor: 'pointer',
              marginLeft: '5px'
            }}
          >
            로그인
          </button>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;