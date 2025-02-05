import { Router, Request, Response } from "express";

import { UserController } from "./controllers/UserController";

const router = Router();


//Rotas User
router.post('/users',new UserController().create)


export {router};