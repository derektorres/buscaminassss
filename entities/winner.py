from persistence.db import get_connection
class Winner:
    def __init__(self, id, name, email):
        self.id = id
        self.name = name
        self.email = email
        
    def save(self):
        try:
            connection = get_connection()
            cursor = connection.cursor()
            
            query = "INSERT INTO winners(name, email) VALUES (%s, %s)"
            cursor.execute(query, (self.name, self.email))
            connection.commit()
            
            self.id = cursor.lastrowid
            return self.id
        except Exception as ex:
            print("error al guardar registro: ", ex)
            return 0
        finally:
            cursor.close()
            connection.close()
    
    @classmethod
    def get_all(cls):
        winners = []
        try:
            connection = get_connection()
            cursor = connection.cursor()
            
            query = "SELECT id, name, email FROM winners"
            cursor.execute(query)
            
            rows = cursor.fetchall()
            
            for row in rows:
                winner = cls(id = row[0], name = row[1], email = row[2])
                winners.append(winner)
            return winners
        
        except Exception as ex:
            print("error al obtener registro: ", ex)
            return []
        finally:
            cursor.close()
            connection.close()