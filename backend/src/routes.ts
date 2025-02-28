import { Router, Request, Response } from "express";

import { UserController } from "./controllers/UserController";
import { AuthUserController } from "./controllers/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { AdminController } from "./controllers/AdminController";
import { isAdmin } from "./middlewares/isAdmin";
import { RoomController } from "./controllers/RoomController";
import { TimesController } from "./controllers/TimeController";
import { ReserveController } from "./controllers/ReserveController";
import { ReserveRoomTimeController } from "./controllers/ReserveRoomTimeController";

const router = Router();

//Rotas User
const userController = new UserController();
router.post('/users',userController.create.bind(userController));
router.put('/users/:id', isAuthenticated, userController.update.bind(userController));
router.delete('/users/:id',isAuthenticated, userController.delete.bind(userController));
router.get('/me', isAuthenticated, userController.detail.bind(userController));
router.post('/session', new AuthUserController().auth);

//Rotas Admin
const adminController = new AdminController();
router.post('/admin', isAuthenticated, isAdmin,adminController.create.bind(adminController));
router.put('/admin', isAuthenticated, isAdmin, adminController.update.bind(adminController));
router.get('/admin/me', isAuthenticated, isAdmin, adminController.detail.bind(adminController));
router.get('/admin', isAuthenticated, isAdmin, adminController.list.bind(adminController));
router.delete('/admin', isAuthenticated, isAdmin, adminController.delete.bind(adminController));

//Rotas Room
const roomController = new RoomController();
router.post('/room', isAuthenticated, isAdmin, roomController.create.bind(roomController))
router.get('/room', roomController.list.bind(roomController))
router.delete('/room/:id', isAuthenticated, isAdmin, roomController.delete.bind(roomController))
router.put('/room/:id', isAuthenticated, isAdmin, roomController.update.bind(roomController))
router.get('/room/actives', roomController.listActiveRooms.bind(roomController))

const timesController = new TimesController();
router.post('/time', isAuthenticated, isAdmin, timesController.create.bind(timesController))
router.get('/time', timesController.list.bind(timesController))
router.delete('/time/:id', isAuthenticated, isAdmin, timesController.delete.bind(timesController))
router.put('/time/:id', isAuthenticated, isAdmin, timesController.update.bind(timesController))

const reserveController = new ReserveController();
router.post('/reserve', isAuthenticated, reserveController.create.bind(reserveController))
router.get('/reserve', isAuthenticated, reserveController.list.bind(reserveController))
router.delete('/reserve/:id', isAuthenticated, reserveController.delete.bind(reserveController))
router.put('/reserve/:id', isAuthenticated, reserveController.update.bind(reserveController))
router.get('/reserve/user', isAuthenticated, reserveController.listReserveUser.bind(reserveController))


const reserveRoomTimeController = new ReserveRoomTimeController();
router.post('/reserveroomtime', isAuthenticated, reserveRoomTimeController.create.bind(reserveRoomTimeController))
router.get('/reserveroomtime/detail', isAuthenticated, reserveRoomTimeController.detail.bind(reserveRoomTimeController))
router.put('/reserveroomtime/:id', isAuthenticated, reserveRoomTimeController.cancel.bind(reserveRoomTimeController))
router.post('/reserveroomtimes', reserveRoomTimeController.list.bind(reserveRoomTimeController))


export {router};