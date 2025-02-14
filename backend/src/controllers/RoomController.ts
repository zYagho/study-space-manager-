import { Request, Response } from "express";
import { RoomService } from "../services/RoomService";


class RoomController{
    private RoomService: RoomService

    constructor(){
        this.RoomService = new RoomService();
    }

    async create(req:Request, res: Response){
        try{
            const {number} = req.body

            const room = await this.RoomService.create({number})

            return res.status(200).json(room)

        }catch(error){

            return res.status(400).json({Erro:error.message})
        }
    }

    async list(req:Request, res: Response){
        try{

            const rooms = await this.RoomService.list()

            return res.status(200).json(rooms)

        }catch(error){

            return res.status(400).json({Erro:error.message})
        }
    }

    async update(req:Request, res: Response){
        try{

            const {id} = req.params
            const {number} = req.body

            const room = await this.RoomService.update({id, number})

            return res.status(200).json(room)

        }catch(error){

            return res.status(400).json({Erro:error.message})
        }
    }
    async delete(req: Request, res: Response){
        try{

            const {id} = req.params

            const room = await this.RoomService.delete({id})

            return res.status(200).json(room)

        }catch(error){

            return res.status(400).json({Erro:error.message})
        }
    }
}

export {RoomController}