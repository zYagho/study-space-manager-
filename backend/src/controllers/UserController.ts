import { Request, Response } from "express";
import { UserService } from "../services/UserService";


class UserController{
    async create(req: Request, res: Response){

        const {name, email, password} = req.body;

        const createUserService = new UserService();

        const user = await createUserService.create({name, email, password})

        return res.json(user)
    }

    async detail(req: Request, res:Response){

        const userId = req.user_id

        const detailUser = new UserService();

        const user = await detailUser.detail(userId);

        res.json(user)
    }
}

export {UserController}