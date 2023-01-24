import { Request, Response} from 'express';

class IndexController {

    public index (req: Request , res: Response) {

        res.send('The ?APIAPIAPIAPIAPI')
    } 

}

export const indexController = new IndexController(); 