import { Request, Response} from 'express';

import nombreController from './nombreController';

import pool from '../database';

class AsistController {

    public async list (req: Request , res: Response) {
        const asistencia = await pool.query('SELECT * FROM Registro');
        res.json (asistencia);
    } 


    public async nombre (req: Request , res: Response) {
        const tabla = await pool.query('SELECT * FROM Alumno');
        res.json (tabla);
    } 

    public getOne(req:  Request , res: Response) {
        res.json({text: 'El registro es '+ req.params.id});
    }

    public async create (req: Request , res: Response ): Promise<void> {
        await pool.query('INSERT INTO Registro set ?', [req.body]);
        res.json({message: 'REGISTRO CREADO'});
    } 

    public delete (req: Request , res: Response) {
        res.json ({text: 'deleting a game' + req.params.id});
    }

    public update (req: Request , res: Response) {
        res.json ({ text: 'ACTUALIZANDO REGISTRO' + req.params.id })
    }

}

const asistController = new AsistController(); 
export default asistController; 
