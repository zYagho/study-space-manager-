import { json, Request, Response } from "express";
import { TimesService } from "../services/TimeService";

class TimesController{
    private timesService: TimesService
    constructor(){
        this.timesService = new TimesService
    }

    async create(req: Request, res: Response){
        try{
            const {start, end} = req.body

            const time = await this.timesService.create({start, end})

            return res.status(200).json(time)
        }catch(error){
            return res.status(400).json({message:error.message})
        }
    }

    async update(req: Request, res: Response){
        try{
            const {start, end} = req.body

            const {id} = req.params
            const newTime = await this.timesService.update({id, start, end})

            return res.status(200).json(newTime)
        }catch(error){
            return res.status(400).json({message:error.message})
        }
    }

    async list(req: Request, res: Response){
        try{

            const newTime = await this.timesService.list()

            return res.status(200).json(newTime)
        }catch(error){
            return res.status(400).json({message:error.message})
        }
    }  
    async delete(req: Request, res: Response){
        try{

            const {id} = req.params
            
            const newTime = await this.timesService.delete({id})

            return res.status(200).json(newTime)
        }catch(error){
            return res.status(400).json({message:error.message})
        }
    }
}

export {TimesController}