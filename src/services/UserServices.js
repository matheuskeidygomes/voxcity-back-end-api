import JWT from 'jsonwebtoken';
import { User } from "../models/User.js";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

export const GetOne = async (id) => {

    let user = await User.findByPk(id);

    if (user) {

        return { id: user.id, name: user.name, email: user.email, experience: user.experience, phone: user.phone, alphanumeric: uuidv4() };

    } else {

        return { error: 'Usuário não encontrado.' };
    }
}

export const Register = async (name, email, password, experience, phone) => {

    let hasUser = await User.findOne({ where: { email } });

    if (!hasUser) {

        let hash = bcrypt.hashSync(password, 10);

        let newUser = await User.create({ name, email, password: hash, experience, phone });

        const accessToken = JWT.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
        const refreshToken = JWT.sign({ id: newUser.id }, process.env.JWT_REFRESH_KEY, { expiresIn: '15 days' });

        return { id: newUser.id, name, email, experience, phone, token: accessToken, refreshToken };

    } else {

        return { error: 'E-mail já existente!' };
    }

}


export const Login = async (email, password) => {

    let user = await User.findOne({ where: { email } });

    if (user) {

        let validPassword = bcrypt.compareSync(password, user.password);

        if (validPassword) {

            const accessToken = JWT.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
            const refreshToken = JWT.sign({ id: user.id }, process.env.JWT_REFRESH_KEY, { expiresIn: '15 days' });

            return { id: user.id, name: user.name, email: user.email, experience: user.experience, phone: user.phone, token: accessToken, refreshToken };

        } else {

            return { error: 'Usuário e/ou senha incorretos! ' };
        }

    } else {

        return { error: 'Usuário e/ou senha incorretos! ' };
    }

}

export const RefreshToken = async (userId) => {

    let user = await User.findOne({ where: { id: userId } });

    if (user) {

        const accessToken = JWT.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

        return { id: user.id, token: accessToken };

    } else {

        return { error: "Id de usuário não encontrado."}
    }
} 

