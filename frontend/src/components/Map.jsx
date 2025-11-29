import React, { useEffect, useRef, useState } from 'react';

function Map({ onStoriesUpdate, onStoryCreate, isLoggedIn }) {
  const mapRef = useRef(null);
  const [renderedMap, setRenderedMap] = useState(null);
  const mapInitialized = useRef(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [loginForm, setLoginForm] = useState({ id: '', password: '' });

  useEffect(() => {
    const initMap = () => {
      if (mapInitialized.current) {
        console.log('맵 이미 초기화됨 - 중단');
        return;
      }
      
      const container = mapRef.current;
      if (!container) {
        console.log('맵 컨테이너가 준비되지 않음');
        return;
      }
      const options = {
        center: new window.kakao.maps.LatLng(37.4979, 127.0276), // 서울 강남역
        level: 3,
        draggable: true,
        scrollwheel: true,
        disableDoubleClick: false,
        disableDoubleClickZoom: false,
        tileAnimation: false,
        projectionId: 'EPSG:3857'
      };

      const map = new window.kakao.maps.Map(container, options);
      console.log('맵 생성 성공! - ID:', Date.now());
      mapInitialized.current = true;
      
      // 레벨 변경 시 애니메이션 비활성화로 잔상 방지
      const originalSetLevel = map.setLevel;
      map.setLevel = function(level, options) {
        const newOptions = { ...options, animate: false };
        return originalSetLevel.call(this, level, newOptions);
      };
      
      setRenderedMap(map);

      // 전체 오버레이 관리
      const allOverlays = [];
      let overlaysVisible = true;

      // 사진이 들어간 커스텀 마커 생성 함수
      const createPhotoMarker = (photoUrl, clickHandler) => {
        const markerDiv = document.createElement('div');
        markerDiv.style.cssText = `
          width: 45px;
          height: 80px;
          border-radius: 12px;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          overflow: hidden;
          background: white;
          cursor: pointer;
        `;
        
        const img = document.createElement('img');
        img.src = photoUrl;
        img.style.cssText = `
          width: 100%;
          height: 100%;
          object-fit: cover;
        `;
        
        markerDiv.appendChild(img);
        
        if (clickHandler) {
          markerDiv.addEventListener('click', clickHandler);
        }
        
        return markerDiv;
      };

      // 기본 마커 이미지 (사진이 없을 때)
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
      const imageSize = new window.kakao.maps.Size(64, 69);
      const imageOption = {offset: new window.kakao.maps.Point(27, 69)};
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      // 테스트 사진 마커
      const markerPosition = new window.kakao.maps.LatLng(37.4979, 127.0276); // 서울 강남역
      const testPhotoUrl = 'https://picsum.photos/200/200?random=1'; // 랜덤 테스트 이미지
      
      // 커스텀 오버레이 콘텐츠 (인스타 스토리 비율 9:16)
      const overlayContent = `
        <div style="
          position: relative;
          width: 270px;
          height: 480px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          animation: slideUp 0.3s ease-out;
          transform-origin: bottom center;
        ">
        <style>
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        </style>
          <div style="
            height: 100%;
            position: relative;
            overflow: hidden;
          ">
            <img src="${testPhotoUrl}" style="
              width: 100%;
              height: 100%;
              object-fit: cover;
            " />
            <!-- 상단 사용자 정보 -->
            <div style="
              position: absolute;
              top: 20px;
              left: 20px;
              right: 20px;
              display: flex;
              align-items: center;
              z-index: 2;
            ">
              <div style="
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: white;
                margin-right: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                color: #333;
              ">김</div>
              <div style="
                color: white;
                font-weight: bold;
                text-shadow: 0 1px 3px rgba(0,0,0,0.5);
              ">김철수</div>
            </div>
            
            <!-- 하단 콘텐츠 -->
            <div style="
              position: absolute;
              bottom: 20px;
              left: 20px;
              right: 20px;
              color: white;
              text-shadow: 0 1px 3px rgba(0,0,0,0.5);
            ">
              <div style="
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 8px;
              ">테스트 스토리</div>
              <div style="
                font-size: 14px;
                line-height: 1.4;
                margin-bottom: 12px;
              ">이곳에서 멋진 추억을 만들었어요! 🌟</div>
              <div style="
                display: flex;
                align-items: center;
                font-size: 14px;
              ">
                <span>❤️ 5</span>
              </div>
            </div>
          </div>
          <div style="
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid white;
          "></div>
        </div>
      `;

      // 커스텀 오버레이 생성
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: overlayContent,
        xAnchor: 0.5,
        yAnchor: 1.2
      });

      // 기본적으로 오버레이 표시
      customOverlay.setMap(map);
      allOverlays.push(customOverlay);

      // 사진 마커 클릭 이벤트
      let overlayVisible = true;
      const photoMarkerElement = createPhotoMarker(testPhotoUrl, function() {
        if (overlayVisible) {
          customOverlay.setMap(null);
          overlayVisible = false;
        } else {
          customOverlay.setMap(map);
          overlayVisible = true;
        }
      });
      
      const photoMarkerOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: photoMarkerElement,
        xAnchor: 0.5,
        yAnchor: 0.5
      });
      photoMarkerOverlay.setMap(map);

      // 맵 클릭 이벤트 (새 스토리 작성) - 비활성화
      /*
      window.kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        const latlng = mouseEvent.latLng;
        
        if (!devIsLoggedIn) {
          alert('스토리 작성을 위해서는 로그인이 필요합니다.');
          return;
        }
        
        const content = prompt('스토리를 작성해주세요:');
        if (content) {
          // 새 사진 마커 생성
          const newPhotoUrl = `https://picsum.photos/200/200?random=${Date.now()}`; // 랜덤 사진
          
          // 새 사진 마커 클릭 이벤트
          let newOverlayVisible = true;
          const newPhotoMarkerElement = createPhotoMarker(newPhotoUrl, function() {
            if (newOverlayVisible) {
              newCustomOverlay.setMap(null);
              newOverlayVisible = false;
            } else {
              newCustomOverlay.setMap(map);
              newOverlayVisible = true;
            }
          });
          
          const newPhotoMarkerOverlay = new window.kakao.maps.CustomOverlay({
            position: latlng,
            content: newPhotoMarkerElement,
            xAnchor: 0.5,
            yAnchor: 0.5
          });
          newPhotoMarkerOverlay.setMap(map);
          
          // 새 스토리 오버레이 (인스타 스토리 비율 9:16)
          const newOverlayContent = `
            <div style="
              position: relative;
              width: 270px;
              height: 480px;
              background: white;
              border-radius: 20px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
              overflow: hidden;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              animation: bounceIn 0.5s ease-out;
            ">
            <style>
              @keyframes bounceIn {
                0% {
                  opacity: 0;
                  transform: scale(0.3);
                }
                50% {
                  opacity: 1;
                  transform: scale(1.05);
                }
                70% {
                  transform: scale(0.9);
                }
                100% {
                  opacity: 1;
                  transform: scale(1);
                }
              }
            </style>
              <div style="
                height: 100%;
                position: relative;
                overflow: hidden;
              ">
                <img src="${newPhotoUrl}" style="
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                " />
                <!-- 상단 사용자 정보 -->
                <div style="
                  position: absolute;
                  top: 20px;
                  left: 20px;
                  right: 20px;
                  display: flex;
                  align-items: center;
                  z-index: 2;
                ">
                  <div style="
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: white;
                    margin-right: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    color: #333;
                  ">나</div>
                  <div style="
                    color: white;
                    font-weight: bold;
                    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
                  ">나</div>
                </div>
                
                <!-- 하단 콘텐츠 -->
                <div style="
                  position: absolute;
                  bottom: 20px;
                  left: 20px;
                  right: 20px;
                  color: white;
                  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
                ">
                  <div style="
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 8px;
                  ">새 스토리</div>
                  <div style="
                    font-size: 14px;
                    line-height: 1.4;
                    margin-bottom: 12px;
                  ">${content}</div>
                  <div style="
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                  ">
                    <span>❤️ 0</span>
                  </div>
                </div>
              </div>
              <div style="
                position: absolute;
                top: -10px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 10px solid white;
              "></div>
            </div>
          `;

          const newCustomOverlay = new window.kakao.maps.CustomOverlay({
            position: latlng,
            content: newOverlayContent,
            xAnchor: 0.5,
            yAnchor: 1.2
          });

          // 새 오버레이 기본 표시
          newCustomOverlay.setMap(map);
          allOverlays.push(newCustomOverlay);


          
          alert('스토리가 작성되었습니다!');
        }
      });
      */

      // 전체 오버레이 토글 버튼 생성
      const toggleButton = document.createElement('button');
      toggleButton.innerHTML = '💬 스토리 카드 끄기';
      toggleButton.style.cssText = `
        position: absolute;
        top: 60px;
        left: 10px;
        z-index: 1000;
        background: white;
        border: none;
        padding: 8px 12px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        cursor: pointer;
        font-size: 12px;
        font-weight: bold;
      `;

      // 버튼 클릭 이벤트
      toggleButton.addEventListener('click', function() {
        overlaysVisible = !overlaysVisible;
        
        allOverlays.forEach(overlay => {
          if (overlaysVisible) {
            overlay.setMap(map);
          } else {
            overlay.setMap(null);
          }
        });
        
        toggleButton.innerHTML = overlaysVisible ? '💬 스토리 카드 끄기' : '💬 스토리 카드 켜기';
      });

      // 버튼을 맵 컨테이너에 추가
      container.parentElement.appendChild(toggleButton);
      
      // 전역 변수로 맵과 오버레이 배열 저장
      window.kakaoMap = map;
      window.allOverlays = allOverlays;
      window.createPhotoMarker = createPhotoMarker;
    };

    // 카카오맵 로드 확인
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(initMap);
    } else {
      // 스크립트 로드 대기
      const checkKakao = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          clearInterval(checkKakao);
          window.kakao.maps.load(initMap);
        }
      }, 100);
    }
  }, []); // 빈 의존성 배열로 한 번만 실행

  // 마커 생성 useEffect
  useEffect(() => {
    if (renderedMap === null) {
      return;
    }
    console.log('마커 생성 준비 완료');
  }, [renderedMap]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // 테스트 계정 확인
    if (loginForm.id === 'test' && loginForm.password === '1234') {
      setUser({ id: 'test', name: '테스트 사용자' });
      setShowLoginModal(false);
      alert('로그인 성공! 환영합니다 🎉');
    } else if (!loginForm.id || !loginForm.password) {
      alert('아이디와 비밀번호를 입력해주세요.');
    } else {
      alert('로그인 실패! 테스트 계정: test / 1234');
    }
  };

  const [lat, setLat] = React.useState('');
  const [lng, setLng] = React.useState('');
  const [content, setContent] = React.useState('');

  const handleCreateStory = () => {
    if (!lat || !lng || !content) {
      alert('위도, 경도, 내용을 모두 입력해주세요.');
      return;
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    if (isNaN(latitude) || isNaN(longitude)) {
      alert('올바른 좌표를 입력해주세요.');
      return;
    }

    // 로그인 확인
    if (!user) {
      alert('로그인이 필요합니다.');
      setShowLoginModal(true);
      return;
    }

    // 맵 객체가 있을 때만 실행
    if (renderedMap) {
      const latlng = new window.kakao.maps.LatLng(latitude, longitude);
      
      // 새 사진 마커 생성
      const newPhotoUrl = `https://picsum.photos/200/200?random=${Date.now()}`;
      
      // 새 사진 마커 클릭 이벤트
      let newOverlayVisible = true;
      const newPhotoMarkerElement = window.createPhotoMarker(newPhotoUrl, function() {
        if (newOverlayVisible) {
          newCustomOverlay.setMap(null);
          newOverlayVisible = false;
        } else {
          newCustomOverlay.setMap(renderedMap);
          newOverlayVisible = true;
        }
      });
      
      const newPhotoMarkerOverlay = new window.kakao.maps.CustomOverlay({
        position: latlng,
        content: newPhotoMarkerElement,
        xAnchor: 0.5,
        yAnchor: 0.5
      });
      newPhotoMarkerOverlay.setMap(renderedMap);
      
      // 새 스토리 오버레이
      const newOverlayContent = `
        <div style="
          position: relative;
          width: 270px;
          height: 480px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          animation: bounceIn 0.5s ease-out;
        ">
        <style>
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.3);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
            70% {
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
        </style>
          <div style="
            height: 100%;
            position: relative;
            overflow: hidden;
          ">
            <img src="${newPhotoUrl}" style="
              width: 100%;
              height: 100%;
              object-fit: cover;
            " />
            <div style="
              position: absolute;
              top: 20px;
              left: 20px;
              right: 20px;
              display: flex;
              align-items: center;
              z-index: 2;
            ">
              <div style="
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: white;
                margin-right: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                color: #333;
              ">나</div>
              <div style="
                color: white;
                font-weight: bold;
                text-shadow: 0 1px 3px rgba(0,0,0,0.5);
              ">나</div>
            </div>
            <div style="
              position: absolute;
              bottom: 20px;
              left: 20px;
              right: 20px;
              color: white;
              text-shadow: 0 1px 3px rgba(0,0,0,0.5);
            ">
              <div style="
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 8px;
              ">새 스토리</div>
              <div style="
                font-size: 14px;
                line-height: 1.4;
                margin-bottom: 12px;
              ">${content}</div>
              <div style="
                display: flex;
                align-items: center;
                font-size: 14px;
              ">
                <span>❤️ 0</span>
              </div>
            </div>
          </div>
          <div style="
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid white;
          "></div>
        </div>
      `;

      const newCustomOverlay = new window.kakao.maps.CustomOverlay({
        position: latlng,
        content: newOverlayContent,
        xAnchor: 0.5,
        yAnchor: 1.2
      });

      newCustomOverlay.setMap(renderedMap);
      window.allOverlays.push(newCustomOverlay);
      
      // 맵 중심을 새 위치로 이동
      renderedMap.setCenter(latlng);
      
      alert('스토리가 생성되었습니다!');
      
      // 입력 필드 초기화
      setLat('');
      setLng('');
      setContent('');
    }
  };

  return (
    <>
      {/* 로그인 모달 */}
      {showLoginModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            animation: 'modalFadeIn 0.3s ease-out'
          }}
          onClick={(e) => {
            // 모달 바깥 클릭 방지
            if (e.target === e.currentTarget) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          <style>
            {`
              @keyframes modalFadeIn {
                from {
                  opacity: 0;
                  backdrop-filter: blur(0px);
                }
                to {
                  opacity: 1;
                  backdrop-filter: blur(5px);
                }
              }
              
              @keyframes modalBounce {
                0% {
                  opacity: 0;
                  transform: translateY(-100px) scale(0.3) rotate(-10deg);
                }
                50% {
                  opacity: 1;
                  transform: translateY(10px) scale(1.1) rotate(2deg);
                }
                70% {
                  transform: translateY(-5px) scale(0.95) rotate(-1deg);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0) scale(1) rotate(0deg);
                }
              }
              
              @keyframes iconBounce {
                0% { transform: scale(1) translateY(0) rotate(0deg); }
                15% { transform: scale(1.1) translateY(-5px) rotate(3deg); }
                30% { transform: scale(0.95) translateY(2px) rotate(-2deg); }
                45% { transform: scale(1.05) translateY(-3px) rotate(1deg); }
                60% { transform: scale(0.98) translateY(1px) rotate(-1deg); }
                75% { transform: scale(1.02) translateY(-1px) rotate(0.5deg); }
                90% { transform: scale(0.99) translateY(0.5px) rotate(-0.5deg); }
                100% { transform: scale(1) translateY(0) rotate(0deg); }
              }
              
              @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              
              @keyframes inputGlow {
                0% { box-shadow: 0 0 5px rgba(0, 149, 246, 0.3); }
                50% { box-shadow: 0 0 20px rgba(0, 149, 246, 0.6); }
                100% { box-shadow: 0 0 5px rgba(0, 149, 246, 0.3); }
              }
              
              @keyframes buttonPulse {
                0% { transform: translateY(-2px) scale(1.02); }
                50% { transform: translateY(-4px) scale(1.05); }
                100% { transform: translateY(-2px) scale(1.02); }
              }
              
              @keyframes testAccountFloat {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-3px); }
                100% { transform: translateY(0px); }
              }
              
              @keyframes titleGlow {
                0% { text-shadow: 0 0 10px rgba(240, 148, 51, 0.5), 0 0 20px rgba(240, 148, 51, 0.3); }
                50% { text-shadow: 0 0 20px rgba(240, 148, 51, 0.8), 0 0 30px rgba(240, 148, 51, 0.5); }
                100% { text-shadow: 0 0 10px rgba(240, 148, 51, 0.5), 0 0 20px rgba(240, 148, 51, 0.3); }
              }
              
              @keyframes subtitleShimmer {
                0% { background-position: -200% center; }
                100% { background-position: 200% center; }
              }
              
              .modal-title {
                color: #ffffff;
                text-shadow: 2px 2px 0px #f09433, 4px 4px 0px #e6683c, 6px 6px 0px #dc2743;
                font-weight: 900;
                letter-spacing: 1px;
                transform: perspective(500px) rotateX(15deg);
                transition: all 0.3s ease;
                cursor: pointer;
              }
              
              .modal-title:hover {
                transform: perspective(500px) rotateX(15deg) scale(1.1);
                text-shadow: 3px 3px 0px #f09433, 6px 6px 0px #e6683c, 9px 9px 0px #dc2743;
              }
              
              .modal-subtitle {
                color: #f0f0f0;
                font-style: italic;
                text-shadow: 1px 1px 2px rgba(240, 148, 51, 0.3);
                font-weight: 400;
                letter-spacing: 2px;
                text-transform: uppercase;
                font-size: 13px !important;
              }
              
              .modal-container {
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              }
              
              .modal-container:hover {
                transform: scale(1.03) !important;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2) !important;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(240, 148, 51, 0.3) 100%) !important;
                border: 1px solid rgba(255, 255, 255, 0.6) !important;
              }
              
              .modal-logo {
                transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                background-size: 200% 200%;
              }
              
              .modal-logo:hover {
                animation: iconBounce 1.2s ease-out infinite;
                box-shadow: 0 15px 40px rgba(240, 148, 51, 0.6), 0 0 20px rgba(240, 148, 51, 0.3);
                background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%, #f09433 125%);
                background-size: 300% 300%;
                transform: scale(1.05);
              }
              
              .modal-logo svg {
                transition: all 0.3s ease;
              }
              
              .modal-logo:hover svg {
                filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
              }
              
              .modal-input {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              }
              
              .modal-input:hover {
                transform: translateY(-3px) scale(1.02);
                box-shadow: 0 8px 25px rgba(0, 149, 246, 0.25);
                background-color: #ffffff !important;
              }
              
              .modal-input:focus {
                transform: translateY(-3px) scale(1.02);
                animation: inputGlow 2s ease-in-out infinite;
                background-color: #ffffff !important;
              }
              
              .modal-button {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                background-size: 300% 300%;
                position: relative;
                overflow: hidden;
              }
              
              .modal-button:hover {
                animation: buttonPulse 1s ease-in-out infinite;
                box-shadow: 0 15px 35px rgba(240, 148, 51, 0.5);
                background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%, #f09433 125%);
                background-size: 400% 400%;
              }
              
              .modal-button:active {
                transform: translateY(0) scale(0.95);
                animation: none;
              }
              
              .test-account {
                transition: all 0.3s ease;
                cursor: pointer;
              }
              
              .test-account:hover {
                animation: testAccountFloat 1s ease-in-out infinite;
                background-color: #e1f5fe !important;
                box-shadow: 0 8px 25px rgba(25, 118, 210, 0.3);
                border-color: #90caf9 !important;
                transform: scale(1.05);
              }
            `}
          </style>
          <div 
            className="modal-container"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(240, 148, 51, 0.2) 100%)',
              borderRadius: '16px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              padding: '40px',
              width: '400px',
              maxWidth: '90vw',
              animation: 'modalBounce 0.5s ease-out',
              position: 'relative',
              overflow: 'hidden'
            }}>

            <div style={{
              textAlign: 'center',
              marginBottom: '32px',
              position: 'relative',
              zIndex: 1
            }}>
              <div 
                className="modal-logo"
                style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  borderRadius: '16px',
                  margin: '0 auto 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  cursor: 'pointer'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="white"/>
                    <path d="M21 10C21 16 12 22 12 22S3 16 3 10C3 5.02 7.02 1 12 1S21 5.02 21 10Z" stroke="white" strokeWidth="2" fill="none"/>
                    <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2" fill="rgba(240, 148, 51, 0.8)"/>
                  </svg>
                </div>
              <h2 className="modal-title" style={{
                margin: 0,
                fontSize: '26px',
                marginBottom: '8px'
              }}>StoryMap 시작하기</h2>
              <p className="modal-subtitle" style={{
                margin: 0,
                fontSize: '15px'
              }}>지도에서 나만의 스토리를 공유해보세요</p>
            </div>
            
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '16px' }}>
                <input
                  className="modal-input"
                  type="text"
                  placeholder="아이디"
                  value={loginForm.id}
                  onChange={(e) => setLoginForm({...loginForm, id: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #dbdbdb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: '#fafafa',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0095f6'}
                  onBlur={(e) => e.target.style.borderColor = '#dbdbdb'}
                />
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <input
                  className="modal-input"
                  type="password"
                  placeholder="비밀번호"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #dbdbdb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: '#fafafa',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0095f6'}
                  onBlur={(e) => e.target.style.borderColor = '#dbdbdb'}
                />
              </div>
              
              <button
                className="modal-button"
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                로그인
              </button>
            </form>
            
            <div className="test-account" style={{
              textAlign: 'center',
              marginTop: '24px',
              padding: '12px',
              backgroundColor: '#e3f2fd',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#1976d2',
              border: '1px solid #bbdefb'
            }}>
              🔑 <strong>테스트 계정</strong><br/>
              아이디: <code style={{backgroundColor: '#fff', padding: '2px 4px', borderRadius: '3px'}}>test</code><br/>
              비밀번호: <code style={{backgroundColor: '#fff', padding: '2px 4px', borderRadius: '3px'}}>1234</code>
            </div>
          </div>
        </div>
      )}
      
      <div 
        style={{ 
          display: 'flex', 
          width: '100%', 
          height: '100vh',
          backgroundColor: '#fafafa',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          filter: showLoginModal ? 'blur(5px)' : 'none',
          pointerEvents: showLoginModal ? 'none' : 'auto',
          userSelect: showLoginModal ? 'none' : 'auto',
          overflow: showLoginModal ? 'hidden' : 'auto'
        }}
        onMouseDown={(e) => showLoginModal && e.preventDefault()}
        onTouchStart={(e) => showLoginModal && e.preventDefault()}
        onKeyDown={(e) => showLoginModal && e.preventDefault()}
      >
      {/* 왼쪽 패널 - 인스타 사이드바 스타일 */}
      <div style={{
        width: '280px',
        backgroundColor: 'white',
        borderRight: '1px solid #dbdbdb',
        padding: '24px 16px',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            borderRadius: '8px',
            marginRight: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>🗺️</div>
          <h1 style={{ 
            margin: 0, 
            fontSize: '20px', 
            fontWeight: '600',
            color: '#262626'
          }}>StoryMap</h1>
        </div>
        
        <div style={{
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          border: '1px solid #e1e8ed',
          fontSize: '14px',
          color: '#65676b',
          lineHeight: '1.4'
        }}>
          💡 마커를 클릭하면 스토리 카드를 볼 수 있어요!
        </div>
        
        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e1e8ed'
        }}>
          <h3 style={{
            margin: '0 0 12px 0',
            fontSize: '16px',
            fontWeight: '600',
            color: '#262626'
          }}>🎆 인기 지역</h3>
          <div style={{ fontSize: '14px', color: '#65676b' }}>
            강남역, 명동, 홍대, 이태원
          </div>
        </div>
      </div>
      
      {/* 가운데 맵 */}
      <div style={{ 
        position: 'relative', 
        flex: 1, 
        height: '100%', 
        overflow: 'hidden',
        isolation: 'isolate'
      }}>
        <div
          ref={mapRef}
          style={{ 
            width: '100%', 
            height: '100%',
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            willChange: 'transform',
            contain: 'layout style paint'
          }}
        />
      </div>
      
      {/* 오른쪽 스토리 생성 패널 - 인스타 포스트 스타일 */}
      <div style={{
        width: '340px',
        height: '100%',
        backgroundColor: 'white',
        borderLeft: '1px solid #dbdbdb',
        padding: '24px',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            borderRadius: '50%',
            marginRight: '12px'
          }}></div>
          <h3 style={{ 
            margin: 0, 
            fontSize: '18px', 
            fontWeight: '600',
            color: '#262626'
          }}>새 스토리 만들기</h3>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '14px', 
            fontWeight: '600',
            color: '#262626'
          }}>위도</label>
          <input
            type="number"
            step="any"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="37.4979"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #dbdbdb',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: '#fafafa',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#0095f6'}
            onBlur={(e) => e.target.style.borderColor = '#dbdbdb'}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '14px', 
            fontWeight: '600',
            color: '#262626'
          }}>경도</label>
          <input
            type="number"
            step="any"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="127.0276"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #dbdbdb',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: '#fafafa',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#0095f6'}
            onBlur={(e) => e.target.style.borderColor = '#dbdbdb'}
          />
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '14px', 
            fontWeight: '600',
            color: '#262626'
          }}>스토리 내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="여기에서 어떤 일이 있었나요? 사진과 함께 공유해보세요! 📸"
            style={{
              width: '100%',
              height: '120px',
              padding: '12px 16px',
              border: '1px solid #dbdbdb',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: '#fafafa',
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              lineHeight: '1.4',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#0095f6'}
            onBlur={(e) => e.target.style.borderColor = '#dbdbdb'}
          />
        </div>
        
        <button
          onClick={handleCreateStory}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            outline: 'none'
          }}
          onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          스토리 공유하기
        </button>
        
        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#f0f2f5',
          borderRadius: '12px',
          fontSize: '12px',
          color: '#65676b',
          lineHeight: '1.4'
        }}>
          💡 <strong>팁:</strong> 강남역 좌표는 위도 37.4979, 경도 127.0276입니다.
        </div>
      </div>
    </div>
    </>
  );
}

export default Map;