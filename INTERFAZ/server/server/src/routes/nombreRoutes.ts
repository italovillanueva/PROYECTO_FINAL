import { Router } from 'express';

import nombreController from '../controllers/nombreController';
import asistController from '../controllers/asistController';

class NombreRoutes {

    public router: Router = Router();

    constructor () {
        this.config();

    }

    config(): void {

        this.router.get('/', nombreController.nombre);
        this.router.get('/', asistController.list);
    }
}

const nombreRoutes = new NombreRoutes();
export default nombreRoutes.router;