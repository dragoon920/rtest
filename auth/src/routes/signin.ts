import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signin', 
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password')
    ], 
    validateRequest,
    async (req:Request, res:Response) =>{
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }
        const PasswordsMatch = await Password.compare(existingUser.password, password);
        if (!PasswordsMatch) {
            throw new BadRequestError('Invalid credentials');
        }

        // Gernerate JWT
        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email,
            },
            process.env.JWT_KEY!
        );
        // Store on seesion object
        req.session = {
            jwt:userJwt
        };

        res.status(201).send(existingUser);

    }
);

export { router as signinRouter};