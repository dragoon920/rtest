import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import { Url } from '../models/url';


const router = express.Router();

router.get('/api/url/:userId', 
    async (req:Request, res:Response) =>{
        const userId = req.params.userId;
        // find a document match to the code in req.params.code
        const url = await Url.find({userId})
        if (url) {
            // when valid we perform a redirect
            res.json(url)
            return res.status(201).send();
        } else {
            // else return a not found 404 status
            return res.status(404).json({ message: ''  });
        }
    }
);

export { router as getUrl};