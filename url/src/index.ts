import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import {postUrl} from './routes/post-url';
import {getUrl} from './routes/get-url'; 


const app = express();
app.set('trust proxy', true);
app.use(json());

const posts ={};

app.get( '/api/url/test', (req, res) => {
    res.send(posts);
});

app.use(postUrl);
app.use(getUrl);

app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);

const start = async() => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    
    try{
        await mongoose.connect('mongodb://url-mongo-srv:27017/url',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('connect to MongoDB');
    } catch (err) {
        console.error(err);
    }
    app.listen(3001,()=>{
        console.log('Listening on port 3001!');
    });
}

start();