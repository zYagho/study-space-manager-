import { Request, Response } from "express";
import { ReserveService } from "../services/ReserveService";


class ReserveController{

    private reserveService: ReserveService

    constructor(){
        this.reserveService = new ReserveService()
    }

    async create(req: Request, res: Response){

        try{
            const {userEmail} = req.body

            const reserve = await this.reserveService.create({userEmail})

            return res.status(200).json(reserve)
        }catch(err){
            return res.status(400).json({Error:err.message})
        }
    }

    async update(req: Request, res: Response){

        // try{
        //     const {userEmail} = req.body

        //     const reserve = await this.reserveService.create({userEmail})

        //     return res.status(200).json(reserve)
        // }catch(err){
        //     return res.status(400).json({Error:err.message})
        // }
    }

    async delete(req: Request, res: Response){

        try{
            const {id} = req.params

            const reserve = await this.reserveService.delete({id})

            return res.status(200).json(reserve)
        }catch(err){
            return res.status(400).json({Error:err.message})
        }
    }

    async list(req: Request, res: Response){

        try{

            const reserve = await this.reserveService.list()

            return res.status(200).json(reserve)
        }catch(err){
            return res.status(400).json({Error:err.message})
        }
    }

    
    async listReserveUser(req: Request, res: Response){

        try{

            const {userEmail} = req.body

            const reserve = await this.reserveService.listReserveUser({userEmail})

            return res.status(200).json(reserve)
        }catch(err){
            return res.status(400).json({Error:err.message})
        }
    }
}

export {ReserveController}