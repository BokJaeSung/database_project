from database import db_connection
from Enitity.Place import Place
from datetime import datetime

class PlaceService:
    def __init__(self):
        self.db = db_connection
    
    def create_place(self, place_data: dict):
        cursor = self.db.get_cursor()
        try:
            sql = "INSERT INTO places (name, latitude, longitude, created_at) VALUES (:1, :2, :3, :4)"
            cursor.execute(sql, (place_data['name'], place_data['latitude'], 
                               place_data['longitude'], datetime.now()))
            self.db.connection.commit()
            return True
        except Exception as e:
            print(f"Error creating place: {e}")
            return False
        finally:
            cursor.close()
    
    def get_place_by_id(self, place_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "SELECT place_id, name, average_rating, latitude, longitude, created_at FROM places WHERE place_id = :1"
            cursor.execute(sql, (place_id,))
            row = cursor.fetchone()
            if row:
                return Place(*row)
            return None
        except Exception as e:
            print(f"Error getting place: {e}")
            return None
        finally:
            cursor.close()
    
    def get_places_by_location(self, latitude: float, longitude: float, radius: float = 1.0):
        cursor = self.db.get_cursor()
        try:
            sql = """SELECT place_id, name, average_rating, latitude, longitude, created_at 
                     FROM places 
                     WHERE SQRT(POWER(latitude - :1, 2) + POWER(longitude - :2, 2)) <= :3"""
            cursor.execute(sql, (latitude, longitude, radius))
            rows = cursor.fetchall()
            return [Place(*row) for row in rows]
        except Exception as e:
            print(f"Error getting places by location: {e}")
            return []
        finally:
            cursor.close()
    
    def update_place(self, place_id: int, place_data: dict):
        cursor = self.db.get_cursor()
        try:
            sql = "UPDATE places SET name = :1, latitude = :2, longitude = :3 WHERE place_id = :4"
            cursor.execute(sql, (place_data['name'], place_data['latitude'], 
                               place_data['longitude'], place_id))
            self.db.connection.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"Error updating place: {e}")
            return False
        finally:
            cursor.close()
    
    def delete_place(self, place_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "DELETE FROM places WHERE place_id = :1"
            cursor.execute(sql, (place_id,))
            self.db.connection.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"Error deleting place: {e}")
            return False
        finally:
            cursor.close()
    
    def update_average_rating(self, place_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = """UPDATE places SET average_rating = (
                        SELECT AVG(rating) FROM reviews WHERE place_id = :1
                     ) WHERE place_id = :1"""
            cursor.execute(sql, (place_id,))
            self.db.connection.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"Error updating average rating: {e}")
            return False
        finally:
            cursor.close()