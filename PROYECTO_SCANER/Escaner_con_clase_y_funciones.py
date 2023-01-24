import urllib.request
import cv2
import numpy as np
from pyzbar import pyzbar
import mysql.connector
from datetime import datetime

class BarcodeScanner:
    def __init__(self, url, user, password, host, database):
        self.url = url
        self.user = user
        self.password = password
        self.host = host
        self.database = database
        
    def connect_to_db(self):
        self.cnx = mysql.connector.connect(
            user=self.user, 
            password=self.password, 
            host=self.host, 
            database=self.database)
        self.cursor = self.cnx.cursor()
    
    def scan(self):
        with urllib.request.urlopen(self.url) as url:
            s = url.read()
        imageNp = np.asarray(bytearray(s), dtype=np.uint8)
        image = cv2.imdecode(imageNp, 0)   
        _, image = cv2.threshold(image, 55, 255, cv2.THRESH_BINARY)
        codes = pyzbar.decode(image)
        valid_code_detected = False
        for code in codes:
            (x, y, w, h) = code.rect
            cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)
            codeData = code.data.decode("utf-8")
            codeType = code.type
            text = "{} ({})".format(codeData, codeType)
            cv2.putText(image, text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
            print("Se encontro {} matricula: {}".format(codeType, codeData))
            current_date=datetime.now()
            if len(codeData) == 10:
                valid_code_detected = True
                insert_row = ("INSERT INTO Registro (maquina_idmaquina, horaFecha, Alumno_Num_matricula) VALUES (%s, %s, %s)")
                data_row = (1, current_date, codeData)
                try:
                    self.cursor.execute(insert_row, data_row)
                    select_query = "SELECT * FROM Registro WHERE Alumno_Num_matricula = %s"
                    self.cursor.execute(select_query, (codeData,))
                    result = self.cursor.fetchall()
                    print(result)
                    self.cnx.commit()
                    for registro in self.cursor.fetchall():
                        for atr in registro:
                            print("\n",atr,end="")
                            print()
                except mysql.connector.Error as error:
                    print("Error al insertar el registro: {}".format(error))
        if not valid_code_detected:
            print("No se encontro ningun codigo de barras valido.")

if __name__ == "__main__":
    scanner = BarcodeScanner("http://192.168.43.176/cam-lo.jpg", 
                             "uyniqjkobaadtbjc", 
                             "hPHykyAwzXOb5gmsawAQ", 
                             "bc7m102l9h1oujcin643-mysql.services.clever-cloud.com", 
                             "bc7m102l9h1oujcin643")
    scanner.connect_to_db()
    scanner.scan()    