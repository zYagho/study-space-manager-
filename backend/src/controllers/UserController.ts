import { Request, Response } from "express";
import { UserService } from "../services/UserService";


class UserController{
    async create(req: Request, res: Response){

        const {name, email, password} = req.body;

        const createUserService = new UserService();

        const user = await createUserService.create({name, email, password})

        return res.json(user)
    }
}

export {UserController}