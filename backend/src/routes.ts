import { Router, Request, Response } from "express";

import { UserController } from "./controllers/UserController";
import { AuthUserController } from "./controllers/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();


//Rotas User
router.post('/users',new UserController().create)
router.put('/users/:id', isAuthenticated, new UserController().update)
router.delete('/users/:id', isAuthenticated, new UserController().delete)

router.post('/session', new AuthUserController().auth)

router.get('/me', isAuthenticated, new UserController().detail)

export {router};