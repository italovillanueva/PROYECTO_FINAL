import { Component , OnInit } from '@angular/core';
import { Registro } from 'src/app/models/Registro';
import { Nombre } from 'src/app/models/Nombre'

import { AsistenciaService } from '../../services/asistencia.service'


@Component({
  selector: 'busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})

export class BusquedaComponent implements OnInit{

  panelOpenState = false;

  constructor (private asistenciaService: AsistenciaService) {

  }

  displayedColumns: string[] = ['Alumno_Num_matricula','Nombres','Apellidos','Correo'];
  registro : any = [];
  ColumnsU1: string[] = ['Alumno_Num_matricula','Semana1','Semana2','Semana3','Semana4','Semana5'];
  ColumnsU2: string[] = ['Alumno_Num_matricula','Semana6','Semana7','Semana8','Semana9','Semana10'];
  ColumnsU3: string[] = ['Alumno_Num_matricula','Semana11','Semana12','Semana13','Semana14','Semana15'];
  nombre : any = [];
  ngOnInit () {
    this.asistenciaService.getReg().subscribe(
      res => {
        this.registro = res
      },
      err=> console.error(err)
    )

    this.asistenciaService.getNombre().subscribe(
      res => {
        this.nombre = res
      },
      err=> console.error(err)
    )
  }

}
