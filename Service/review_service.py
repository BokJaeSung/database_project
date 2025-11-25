from database import db_connection
from Enitity.Review import Review
from datetime import datetime

class ReviewService:
    def __init__(self):
        self.db = db_connection
    
    def create_review(self, review_data: dict):
        cursor = self.db.get_cursor()
        try:
            sql = "INSERT INTO REVIEW (user_id, place_id, title, content, rating, created_at) VALUES (:1, :2, :3, :4, :5, :6)"
            cursor.execute(sql, (review_data['user_id'], review_data['place_id'], 
                               review_data['title'], review_data['content'], 
                               review_data['rating'], datetime.now()))
            self.db.connection.commit()
            return True
        except Exception as e:
            print(f"Error creating review: {e}")
            return False
        finally:
            cursor.close()
    
    def get_review_by_id(self, review_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "SELECT review_id, user_id, place_id, title, content, rating, created_at FROM REVIEW WHERE review_id = :1"
            cursor.execute(sql, (review_id,))
            row = cursor.fetchone()
            if row:
                return Review(*row)
            return None
        except Exception as e:
            print(f"Error getting review: {e}")
            return None
        finally:
            cursor.close()
    
    def get_reviews_by_place(self, place_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "SELECT review_id, user_id, place_id, title, content, rating, created_at FROM REVIEW WHERE place_id = :1"
            cursor.execute(sql, (place_id,))
            rows = cursor.fetchall()
            return [Review(*row) for row in rows]
        except Exception as e:
            print(f"Error getting reviews by place: {e}")
            return []
        finally:
            cursor.close()
    
    def get_reviews_by_user(self, user_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "SELECT review_id, user_id, place_id, title, content, rating, created_at FROM REVIEW WHERE user_id = :1"
            cursor.execute(sql, (user_id,))
            rows = cursor.fetchall()
            return [Review(*row) for row in rows]
        except Exception as e:
            print(f"Error getting reviews by user: {e}")
            return []
        finally:
            cursor.close()
    
    def update_review(self, review_id: int, review_data: dict):
        cursor = self.db.get_cursor()
        try:
            sql = "UPDATE REVIEW SET title = :1, content = :2, rating = :3 WHERE review_id = :4"
            cursor.execute(sql, (review_data['title'], review_data['content'], 
                               review_data['rating'], review_id))
            self.db.connection.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"Error updating review: {e}")
            return False
        finally:
            cursor.close()
    
    def delete_review(self, review_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "DELETE FROM REVIEW WHERE review_id = :1"
            cursor.execute(sql, (review_id,))
            self.db.connection.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"Error deleting review: {e}")
            return False
        finally:
            cursor.close()