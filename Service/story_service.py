from database import db_connection
from Enitity.Story import Story
from datetime import datetime

class StoryService:
    def __init__(self):
        self.db = db_connection
    
    # 새 스토리 생성
    def create_story(self, story_data: dict):
        cursor = self.db.get_cursor()
        try:
            sql = "INSERT INTO STORY (story_id, user_id, image_url, content, latitude, longitude) VALUES (STORY_SEQ.NEXTVAL, :1, :2, :3, :4, :5)"
            cursor.execute(sql, (story_data['user_id'], story_data['image_url'], 
                               story_data['content'], story_data['latitude'], 
                               story_data['longitude']))
            self.db.connection.commit()
            return True
        except Exception as e:
            print(f"Error creating story: {e}")
            return False
        finally:
            cursor.close()
    
    # 스토리 ID로 스토리 조회
    def get_story_by_id(self, story_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "SELECT story_id, user_id, image_url, content, latitude, longitude, likes, created_at FROM STORY WHERE story_id = :1"
            cursor.execute(sql, (story_id,))
            row = cursor.fetchone()
            if row:
                return Story(*row)
            return None
        except Exception as e:
            print(f"Error getting story: {e}")
            return None
        finally:
            cursor.close()
    
    # 사용자별 스토리 목록 조회
    def get_stories_by_user(self, user_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "SELECT story_id, user_id, image_url, content, latitude, longitude, likes, created_at FROM STORY WHERE user_id = :1"
            cursor.execute(sql, (user_id,))
            rows = cursor.fetchall()
            return [Story(*row) for row in rows]
        except Exception as e:
            print(f"Error getting stories by user: {e}")
            return []
        finally:
            cursor.close()
    
    # 위치 기반 스토리 검색
    def get_stories_by_location(self, latitude: float, longitude: float, radius: float = 1.0):
        cursor = self.db.get_cursor()
        try:
            sql = """SELECT story_id, user_id, image_url, content, latitude, longitude, likes, created_at 
                     FROM STORY 
                     WHERE SQRT(POWER(latitude - :1, 2) + POWER(longitude - :2, 2)) <= :3"""
            cursor.execute(sql, (latitude, longitude, radius))
            rows = cursor.fetchall()
            return [Story(*row) for row in rows]
        except Exception as e:
            print(f"Error getting stories by location: {e}")
            return []
        finally:
            cursor.close()
    
    # 스토리 정보 수정
    def update_story(self, story_id: int, story_data: dict):
        cursor = self.db.get_cursor()
        try:
            sql = "UPDATE STORY SET content = :1, image_url = :2 WHERE story_id = :3"
            cursor.execute(sql, (story_data['content'], story_data['image_url'], story_id))
            self.db.connection.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"Error updating story: {e}")
            return False
        finally:
            cursor.close()
    
    # 스토리 삭제
    def delete_story(self, story_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "DELETE FROM STORY WHERE story_id = :1"
            cursor.execute(sql, (story_id,))
            self.db.connection.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"Error deleting story: {e}")
            return False
        finally:
            cursor.close()
    
    # 스토리 좋아요 수 업데이트
    def update_likes_count(self, story_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = """UPDATE STORY SET likes = (
                        SELECT COUNT(*) FROM LIKE_T WHERE story_id = :1
                     ) WHERE story_id = :1"""
            cursor.execute(sql, (story_id,))
            self.db.connection.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"Error updating likes count: {e}")
            return False
        finally:
            cursor.close()