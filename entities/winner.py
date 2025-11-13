from persistence.db import get_connection
class Winner:
    def __init__(self, id, name, email):
        self.id = id
        self.name = name
        self.email = email
    def save(self):
        connection = get_connection()
        cursor = connection.cursor()
        
        query = "INSERT INTO winners(name, email) VALUES (%s, %s)"
        cursor.execute(query, (self.name, self.email))
        
        