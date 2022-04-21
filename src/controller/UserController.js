import * as UserService from '../services/UserServices.js';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const GetOne = async (req, res) => {

    let { id } = req.params;

    let auth = req.headers.authorization.split(" ");
    let token = JWT.verify(auth[1], process.env.JWT_SECRET_KEY);
    let userId = token.id;
    
    if (id === userId.toString()) {

        let user = await UserService.GetOne(id);

        res.json(user);

    } else {

        res.json({ error: "Este ID de usuário não pertence a sua conta. Por favor, insira o ID correto." });
    }
};


export const Register = async (req, res) => {

    const { name, email, password, experience, phone } = req.body;

    if (name && email && password && experience && phone) {

        let response = await UserService.Register(name, email, password, experience, phone);

        res.json(response);

    } else {

        res.json({ error: 'Por favor preencha todos os campos necessários!' });
    }

};

export const Login = async (req, res) => {

    if (req.body.email && req.body.password) {

        const { email, password } = req.body;

        let response = await UserService.Login(email, password);

        res.json(response);

    } else {

        res.json({ error: 'E-mail e/ou senha não enviados!' });
    }

};




