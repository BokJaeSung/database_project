import React, { useEffect, useRef } from 'react';

function Map({ onStoriesUpdate, onStoryCreate, isLoggedIn }) {
  // 개발 중 - 로그인 상태 하드코딩
  const devIsLoggedIn = true;
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      };

      const map = new window.kakao.maps.Map(container, options);
      console.log('맵 생성 성공!');

      // 커스텀 마커 이미지
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
      const imageSize = new window.kakao.maps.Size(64, 69);
      const imageOption = {offset: new window.kakao.maps.Point(27, 69)};
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      // 테스트 마커
      const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
        clickable: true
      });
      marker.setMap(map);
      
      // 테스트 마커 인포윈도우
      const testInfoContent = '<div style="padding:5px;">테스트 마커입니다!</div>';
      const testInfoWindow = new window.kakao.maps.InfoWindow({
        content: testInfoContent,
        removable: true
      });
      
      // 테스트 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, 'click', function() {
        testInfoWindow.open(map, marker);
      });

      // 클릭 이벤트
      window.kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        const latlng = mouseEvent.latLng;
        
        if (!devIsLoggedIn) {
          alert('스토리 작성을 위해서는 로그인이 필요합니다.');
          return;
        }
        
        const content = prompt('스토리를 작성해주세요:');
        if (content) {
          const newMarker = new window.kakao.maps.Marker({
            position: latlng,
            image: markerImage,
            clickable: true
          });
          newMarker.setMap(map);
          
          // 새 마커 인포윈도우
          const infoContent = `<div style="padding:10px; max-width:200px;">
            <h4 style="margin:0 0 5px 0;">스토리</h4>
            <p style="margin:0;">${content}</p>
          </div>`;
          const infoWindow = new window.kakao.maps.InfoWindow({
            content: infoContent,
            removable: true
          });
          
          // 새 마커 클릭 이벤트
          window.kakao.maps.event.addListener(newMarker, 'click', function() {
            infoWindow.open(map, newMarker);
          });
          
          alert('스토리가 작성되었습니다!');
        }
      });
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
  }, [isLoggedIn]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        ref={mapRef}
        style={{ width: '100%', height: '100%' }}
      />
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        fontSize: '12px'
      }}>
        💡 맵을 클릭하여 스토리를 작성하세요! (개발 모드)
      </div>
    </div>
  );
}

export default Map;