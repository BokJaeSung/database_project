from database import db_connection
from Enitity.Like_t import Like_t
from datetime import datetime

class LikeService:
    def __init__(self):
        self.db = db_connection
    
    def toggle_like(self, user_id: int, story_id: int):
        cursor = self.db.get_cursor()
        try:
            # 좋아요가 이미 있는지 확인
            check_sql = "SELECT COUNT(*) FROM LIKE_T WHERE user_id = :1 AND story_id = :2"
            cursor.execute(check_sql, (user_id, story_id))
            exists = cursor.fetchone()[0] > 0
            
            if exists:
                # 좋아요 제거
                sql = "DELETE FROM LIKE_T WHERE user_id = :1 AND story_id = :2"
                cursor.execute(sql, (user_id, story_id))
            else:
                # 좋아요 추가
                sql = "INSERT INTO LIKE_T (user_id, story_id, created_at) VALUES (:1, :2, :3)"
                cursor.execute(sql, (user_id, story_id, datetime.now()))
            
            self.db.connection.commit()
            return not exists  # 추가되었으면 True, 제거되었으면 False
        except Exception as e:
            print(f"Error toggling like: {e}")
            return False
        finally:
            cursor.close()
    
    def get_story_likes(self, story_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "SELECT user_id, story_id, created_at FROM LIKE_T WHERE story_id = :1"
            cursor.execute(sql, (story_id,))
            rows = cursor.fetchall()
            return [Like_t(*row) for row in rows]
        except Exception as e:
            print(f"Error getting story likes: {e}")
            return []
        finally:
            cursor.close()
    
    def get_user_likes(self, user_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "SELECT user_id, story_id, created_at FROM LIKE_T WHERE user_id = :1"
            cursor.execute(sql, (user_id,))
            rows = cursor.fetchall()
            return [Like_t(*row) for row in rows]
        except Exception as e:
            print(f"Error getting user likes: {e}")
            return []
        finally:
            cursor.close()
    
    def get_likes_count(self, story_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "SELECT COUNT(*) FROM LIKE_T WHERE story_id = :1"
            cursor.execute(sql, (story_id,))
            return cursor.fetchone()[0]
        except Exception as e:
            print(f"Error getting likes count: {e}")
            return 0
        finally:
            cursor.close()
    
    def is_liked_by_user(self, user_id: int, story_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "SELECT COUNT(*) FROM LIKE_T WHERE user_id = :1 AND story_id = :2"
            cursor.execute(sql, (user_id, story_id))
            return cursor.fetchone()[0] > 0
        except Exception as e:
            print(f"Error checking if liked: {e}")
            return False
        finally:
            cursor.close()