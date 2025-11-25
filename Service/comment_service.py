from database import db_connection
from Enitity.Comment_t import Comment_t
from datetime import datetime

class CommentService:
    def __init__(self):
        self.db = db_connection
    
    def create_comment(self, comment_data: dict):
        cursor = self.db.get_cursor()
        try:
            sql = "INSERT INTO COMMENT_T (user_id, review_id, content, created_at) VALUES (:1, :2, :3, :4)"
            cursor.execute(sql, (comment_data['user_id'], comment_data['review_id'], 
                               comment_data['content'], datetime.now()))
            self.db.connection.commit()
            return True
        except Exception as e:
            print(f"Error creating comment: {e}")
            return False
        finally:
            cursor.close()
    
    def get_comment_by_id(self, comment_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "SELECT comment_id, user_id, review_id, content, created_at FROM COMMENT_T WHERE comment_id = :1"
            cursor.execute(sql, (comment_id,))
            row = cursor.fetchone()
            if row:
                return Comment_t(*row)
            return None
        except Exception as e:
            print(f"Error getting comment: {e}")
            return None
        finally:
            cursor.close()
    
    def get_comments_by_review(self, review_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "SELECT comment_id, user_id, review_id, content, created_at FROM COMMENT_T WHERE review_id = :1"
            cursor.execute(sql, (review_id,))
            rows = cursor.fetchall()
            return [Comment_t(*row) for row in rows]
        except Exception as e:
            print(f"Error getting comments by review: {e}")
            return []
        finally:
            cursor.close()
    
    def get_comments_by_user(self, user_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "SELECT comment_id, user_id, review_id, content, created_at FROM COMMENT_T WHERE user_id = :1"
            cursor.execute(sql, (user_id,))
            rows = cursor.fetchall()
            return [Comment_t(*row) for row in rows]
        except Exception as e:
            print(f"Error getting comments by user: {e}")
            return []
        finally:
            cursor.close()
    
    def update_comment(self, comment_id: int, comment_data: dict):
        cursor = self.db.get_cursor()
        try:
            sql = "UPDATE COMMENT_T SET content = :1 WHERE comment_id = :2"
            cursor.execute(sql, (comment_data['content'], comment_id))
            self.db.connection.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"Error updating comment: {e}")
            return False
        finally:
            cursor.close()
    
    def delete_comment(self, comment_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "DELETE FROM COMMENT_T WHERE comment_id = :1"
            cursor.execute(sql, (comment_id,))
            self.db.connection.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"Error deleting comment: {e}")
            return False
        finally:
            cursor.close()