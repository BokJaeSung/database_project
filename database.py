import cx_Oracle
from typing import Optional

class DatabaseConnection:
    def __init__(self):
        self.host = "localhost"
        self.port = 1521
        self.service_name = "orcl"
        self.username = "team14_user"  # 실제 사용자명으로 변경
        self.password = "team14_password"  # 실제 비밀번호로 변경
        self.connection: Optional[cx_Oracle.Connection] = None
    
    def connect(self):
        try:
            dsn = cx_Oracle.makedsn(self.host, self.port, service_name=self.service_name)
            self.connection = cx_Oracle.connect(self.username, self.password, dsn)
            return self.connection
        except cx_Oracle.Error as e:
            print(f"Database connection error: {e}")
            return None
    
    def disconnect(self):
        if self.connection:
            self.connection.close()
            self.connection = None
    
    def get_cursor(self):
        if not self.connection:
            self.connect()
        return self.connection.cursor() if self.connection else None

db_connection = DatabaseConnection()