import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import { Url } from '../models/url';

const router = express.Router();

router.post('/api/url/:userId', 
    async (req:Request, res:Response) =>{
        const {
            longUrl
        } = req.body 

        const shortUrl = 'abcde';
        const urlCode = 'abcde';
        const userId = req.params.userId;

        let url = new Url({
            longUrl,
            shortUrl,
            userId,
            urlCode,
            date: new Date()
        })
        await url.save();
        res.json(url)
        res.status(201).send();
    }
);

export { router as postUrl};