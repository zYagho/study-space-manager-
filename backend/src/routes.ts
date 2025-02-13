import { Router, Request, Response } from "express";

import { UserController } from "./controllers/UserController";
import { AuthUserController } from "./controllers/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { AdminController } from "./controllers/AdminController";
import { isAdmin } from "./middlewares/isAdmin";


const router = Router();



//Rotas User
//const userController = new UserController();
router.post('/users',new UserController().create);
router.put('/users/:id', isAuthenticated, new UserController().update);
router.delete('/users/:id',isAuthenticated,new UserController().delete);
router.get('/me', isAuthenticated, new UserController().detail);
router.post('/session', new AuthUserController().auth);


//Rotas Admin
const adminController = new AdminController();
router.post('/admin', isAuthenticated, isAdmin,adminController.create.bind(adminController));
router.put('/admin', isAuthenticated, isAdmin, adminController.update.bind(adminController));
router.get('/admin/me', isAuthenticated, isAdmin, adminController.detail.bind(adminController));
router.get('/admin', isAuthenticated, isAdmin, adminController.list.bind(adminController));
router.delete('/admin', isAuthenticated, isAdmin, adminController.delete.bind(adminController));


export {router};