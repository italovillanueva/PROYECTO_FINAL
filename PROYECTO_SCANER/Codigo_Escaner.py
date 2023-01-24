import urllib.request
import cv2
import numpy as np
from pyzbar import pyzbar
import mysql.connector
from datetime import datetime

# Abrir y leer URL
url = "http://192.168.43.176/cam-lo.jpg"

with urllib.request.urlopen(url) as url:
    s = url.read()

#Conectamos al servidor
cnx = mysql.connector.connect(
    user='uyniqjkobaadtbjc', 
    password='hPHykyAwzXOb5gmsawAQ', 
    host='bc7m102l9h1oujcin643-mysql.services.clever-cloud.com', 
    database='bc7m102l9h1oujcin643')

# Crear una imagen OpenCV a partir de la información de la URL
imageNp = np.asarray(bytearray(s), dtype=np.uint8)

# Leemos la imagen con opencv
image = cv2.imdecode(imageNp, 0)   

# Aplica el umbral para convertir la imagen a blanco y negro
_, image = cv2.threshold(image, 55, 255, cv2.THRESH_BINARY)

# Buscar códigos de barras en la imagen
codes = pyzbar.decode(image)

#Creamos el cursor
cursor = cnx.cursor()

#Creamos una variable booleana
valid_code_detected = False

# Extraer el contenido del código de barras
for code in codes:
    (x, y, w, h) = code.rect
    #Creamos un rectangulo para que se pueda apreciar el código
    cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)
    codeData = code.data.decode("utf-8")
    codeType = code.type
    #En el rectángulo mostramos también el tipo de código y la matrícula
    text = "{} ({})".format(codeData, codeType)
    cv2.putText(image, text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
    print("Se encontro {} matricula: {}".format(codeType, codeData))

    #Agrega una variable para dar la hora actual
    current_date=datetime.now()
    
    #Hace una condición para detectar exactamente la cantidad de digitos que queremos
    if len(codeData) == 10:
                
        valid_code_detected = True
            
        # Crear la sentencia SQL para actualizar el registro
        insert_row = ("INSERT INTO Registro (maquina_idmaquina, horaFecha, Alumno_Num_matricula) VALUES (%s, %s, %s)")
            
            # Crear los valores a insertar en la fila
        data_row = (1, current_date, codeData)
            
            # intentar registrar el valor de codeData en la base de datos 
        try:
            cursor.execute(insert_row, data_row)
                    
            # Consultar los registros actuales en la tabla
            select_query = "SELECT * FROM Registro WHERE Alumno_Num_matricula = %s"
            cursor.execute(select_query, (codeData,))
            result = cursor.fetchall()
            print(result)
                    
            cnx.commit()
            for registro in cursor.fetchall():
                for atr in registro:
                    print("\n",atr,end="")
                    print()
        except mysql.connector.Error as error:
            print("Error al insertar el registro: {}".format(error))
        finally:
            if (cnx.is_connected()):
                cursor.close()
                cnx.close()
                print('MySQL connection is closed')
        break 
    
# Mostramos la imagen en una ventana    
cv2.imshow("Image", image)
cv2.waitKey(0)
cv2.destroyAllWindows()