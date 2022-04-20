import express from 'express';  
import dotenv from 'dotenv';
import cors from 'cors'; 

import routes from './routes/routes.js';

dotenv.config();

const server = express();

server.use(cors()); 

server.use(express.static('public')); 

server.use(express.json());

server.use(routes); 

server.use((req, res) => { res.status(404).send('Página não encontrada'); });

server.use((err, req, res, next) => {

   res.status(400);

   if(err) {

      res.json({ error: err.message });

   } else {

      res.json({ error: 'Ocorreu um erro, tente novamente!' });
   }
   
});

server.listen(process.env.PORT || 3333 );  