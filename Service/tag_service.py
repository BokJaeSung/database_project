from database import db_connection
from Enitity.Tag import Tag

class TagService:
    def __init__(self):
        self.db = db_connection
    
    def create_tag(self, tag_data: dict):
        cursor = self.db.get_cursor()
        try:
            sql = "INSERT INTO tags (name) VALUES (:1)"
            cursor.execute(sql, (tag_data['name'],))
            self.db.connection.commit()
            return True
        except Exception as e:
            print(f"Error creating tag: {e}")
            return False
        finally:
            cursor.close()
    
    def get_tag_by_id(self, tag_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "SELECT tag_id, name FROM tags WHERE tag_id = :1"
            cursor.execute(sql, (tag_id,))
            row = cursor.fetchone()
            if row:
                return Tag(*row)
            return None
        except Exception as e:
            print(f"Error getting tag: {e}")
            return None
        finally:
            cursor.close()
    
    def get_all_tags(self):
        cursor = self.db.get_cursor()
        try:
            sql = "SELECT tag_id, name FROM tags"
            cursor.execute(sql)
            rows = cursor.fetchall()
            return [Tag(*row) for row in rows]
        except Exception as e:
            print(f"Error getting all tags: {e}")
            return []
        finally:
            cursor.close()
    
    def add_story_tag(self, story_id: int, tag_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "INSERT INTO story_tags (story_id, tag_id) VALUES (:1, :2)"
            cursor.execute(sql, (story_id, tag_id))
            self.db.connection.commit()
            return True
        except Exception as e:
            print(f"Error adding story tag: {e}")
            return False
        finally:
            cursor.close()
    
    def remove_story_tag(self, story_id: int, tag_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = "DELETE FROM story_tags WHERE story_id = :1 AND tag_id = :2"
            cursor.execute(sql, (story_id, tag_id))
            self.db.connection.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"Error removing story tag: {e}")
            return False
        finally:
            cursor.close()
    
    def get_story_tags(self, story_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = """SELECT t.tag_id, t.name FROM tags t 
                     JOIN story_tags st ON t.tag_id = st.tag_id 
                     WHERE st.story_id = :1"""
            cursor.execute(sql, (story_id,))
            rows = cursor.fetchall()
            return [Tag(*row) for row in rows]
        except Exception as e:
            print(f"Error getting story tags: {e}")
            return []
        finally:
            cursor.close()
    
    def get_stories_by_tag(self, tag_id: int):
        cursor = self.db.get_cursor()
        try:
            sql = """SELECT story_id FROM story_tags WHERE tag_id = :1"""
            cursor.execute(sql, (tag_id,))
            rows = cursor.fetchall()
            return [row[0] for row in rows]
        except Exception as e:
            print(f"Error getting stories by tag: {e}")
            return []
        finally:
            cursor.close()