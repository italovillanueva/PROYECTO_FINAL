import { Injectable } from '@angular/core';


import { Registro } from '../models/Registro'
import { HttpClient } from '@angular/common/http'
import { Nombre } from '../models/Nombre'

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  API_URI = 'http://localhost:3000/asistencia'
  API_UR = 'http://localhost:3000/nombre'

  constructor(private http: HttpClient) { }

  getReg( ) {
    return this.http.get(`${this.API_URI}`)
  }

  getNombre( ) {
    return this.http.get(`${this.API_UR}`)
  }
}
