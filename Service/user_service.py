from database import db_connection
from Enitity.User_t import User_t
from datetime import datetime

class UserService:
    def __init__(self):
        self.db = db_connection
    
    def create_user(self, user_data: dict):
        cursor = self.db.get_cursor()
        try:
            sql = "INSERT INTO USER_T (id, password, name, email, created_at) VALUES (:1, :2, :3, :4, :5)"
            cursor.execute(sql, (user_data['id'], user_data['password'], 
                               user_data['name'], user_data['email'], datetime.now()))
            self.db.connection.commit()
            return True
        except Exception as e:
            print(f"Error creating user: {e}")
            return False
        finally:
            cursor.close()
    
    def get_user_by_id(self, user_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "SELECT user_id, id, password, name, email, created_at FROM USER_T WHERE user_id = :1"
            cursor.execute(sql, (user_id,))
            row = cursor.fetchone()
            if row:
                return User_t(*row)
            return None
        except Exception as e:
            print(f"Error getting user: {e}")
            return None
        finally:
            cursor.close()
    
    def get_user_by_login_id(self, login_id: str):
        cursor = self.db.get_cursor()
        try:
            sql = "SELECT user_id, id, password, name, email, created_at FROM USER_T WHERE id = :1"
            cursor.execute(sql, (login_id,))
            row = cursor.fetchone()
            if row:
                return User_t(*row)
            return None
        except Exception as e:
            print(f"Error getting user by login_id: {e}")
            return None
        finally:
            cursor.close()
    
    def update_user(self, user_id: int, user_data: dict):
        cursor = self.db.get_cursor()
        try:
            sql = "UPDATE USER_T SET name = :1, email = :2 WHERE user_id = :3"
            cursor.execute(sql, (user_data['name'], user_data['email'], user_id))
            self.db.connection.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"Error updating user: {e}")
            return False
        finally:
            cursor.close()
    
    def delete_user(self, user_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "DELETE FROM USER_T WHERE user_id = :1"
            cursor.execute(sql, (user_id,))
            self.db.connection.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"Error deleting user: {e}")
            return False
        finally:
            cursor.close()
    
    def authenticate_user(self, login_id: str, password: str):
        user = self.get_user_by_login_id(login_id)
        if user and user.password == password:
            return user
        return None