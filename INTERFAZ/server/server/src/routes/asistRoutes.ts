import { Router } from 'express';

import asistController from '../controllers/asistController';
import nombreController from '../controllers/nombreController';

class AsistRoutes {

    public router: Router = Router();

    constructor () {
        this.config();

    }

    config(): void {

        this.router.get('/', asistController.list);
        this.router.get('/',nombreController.nombre);
        this.router.delete('/:id',asistController.delete);
        this.router.put('/:id',asistController.update);
    }
}

const asistRoutes = new AsistRoutes();
export default asistRoutes.router;