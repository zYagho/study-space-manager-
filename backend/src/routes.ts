import { Router, Request, Response } from "express";

import { UserController } from "./controllers/UserController";
import { AuthUserController } from "./controllers/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";


const router = Router();


//Rotas User
router.post('/users',new UserController().create)
router.put('/users/:id', isAuthenticated, new UserController().update)
router.delete('/users/:id', new UserController().delete)
router.get('/me', isAuthenticated, new UserController().detail)
router.post('/session', new AuthUserController().auth)

export {router};