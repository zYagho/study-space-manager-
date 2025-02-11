import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import prismaClient from "../prisma";


class UserController{
    async create(req: Request, res: Response){

        const {name, email, password} = req.body;

        const createUserService = new UserService();

        const user = await createUserService.create({name, email, password})

        return res.json(user)
    }

    async update(req: Request, res: Response){

        const {id} = req.params;

        const {name, password} = req.body;

        const userService = new UserService();
        const user = await userService.update({id, name, password})

        return res.json(user)
    }

    async delete(req:Request, res: Response){
        const {id} = req.params

        const userService = new UserService();

        const user = await userService.delete({id});
    }

    async detail(req: Request, res:Response){

        const userId = req.user_id

        const detailUser = new UserService();

        const user = await detailUser.detail(userId);

        res.json(user)
    }
}

export {UserController}