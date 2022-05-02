import { Router } from 'express';                                   
import * as UserController from '../controller/UserController.js';     
import { Auth } from '../middlewares/auth.js';                                    

const router = Router(); 

router.post('/register', UserController.Register);
router.post('/login', UserController.Login);  
router.post('/refresh', Auth.refresh, UserController.Refresh);     
router.get('/user/:id', Auth.private, UserController.GetOne);        

export default router;      

