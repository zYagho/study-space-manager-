import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController{
    private timesService: UserService
    constructor(){
        this.timesService = new UserService();
    }

    async create(req: Request, res: Response){

        const {name, email, password} = req.body;

        const user = await this.timesService.create({name, email, password})

        return res.json(user)
    }

    async update(req: Request, res: Response){

        const {id} = req.params;

        const {name, password} = req.body;

        const user = await this.timesService.update({id, name, password})

        return res.json(user)
    }

    async delete(req:Request, res: Response){
        const {id} = req.params

        const user = await this.timesService.delete({id});

        return res.json(user)
    }

    async detail(req: Request, res:Response){

        const userId = req.user_id

        const user = await this.timesService.detail(userId);

        res.json(user)
    }
}

export {UserController}