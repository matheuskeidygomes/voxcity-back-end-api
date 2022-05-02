import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const Auth = {

    private: async (req, res, next) => {

        if (req.headers.authorization) {

            const [authType, token] = req.headers.authorization.split(' ');

            if (authType === 'Bearer') {

                JWT.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {

                    if (err) {

                        if (err.name === "JsonWebTokenError") {

                            res.status(403);
                            res.json({ error: "Token inválido! Por favor, insira um token válido." });

                        } else {

                            res.status(403);
                            res.json({ error: "Token expirado! Por favor, efetue o login novamente." });

                        }

                    } else {

                        next();
                    }

                });

            } else {

                res.status(403);
                res.json({ error: "Tipo de autorização inválido!" });
            }

        } else {

            res.status(403);
            res.json({ error: 'Não autorizado!' });
        }

    },

    refresh: (req, res, next) => {

        const { refreshToken } = req.body;

        if (refreshToken) {

            JWT.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, data) => {

                if (err) {

                    if (err.name === "JsonWebTokenError") {

                        res.status(403);
                        res.json({ error: "Token inválido! Por favor, insira um token válido." });

                    } else {

                        res.status(403);
                        res.json({ error: "Token expirado! Por favor, efetue o login novamente." });

                    }

                } else {

                    next();
                }

            });

        } else {

            res.status(403);
            res.json({ error: 'Não autorizado!' });
        }

    }

}