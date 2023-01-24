import { Request, Response} from 'express';

import pool from '../database';

class NombreController {

    public async nombre (req: Request , res: Response) {
        const tabla = await pool.query('SELECT * FROM Alumno');
        res.json (tabla);
    } 

    public async list (req: Request , res: Response) {
        const asistencia = await pool.query('SELECT * FROM Registro');
        res.json (asistencia);
    } 
}
const nombreController = new NombreController(); 
export default nombreController; 
