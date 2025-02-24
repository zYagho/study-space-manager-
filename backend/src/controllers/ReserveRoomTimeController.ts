import { Response, Request } from "express";
import { ReserveRoomTimeService } from "../services/ReserveRoomTimeService";

class ReserveRoomTimeController{

    private reserveService: ReserveRoomTimeService

    constructor(){
        this.reserveService = new ReserveRoomTimeService();
    }
    async create(req: Request, res: Response){

        try{
            const {reserveID, timeID, roomID, reserveDay} = req.body

            const reserve = await this.reserveService.create({reserveID, timeID, roomID, reserveDay})
            return res.status(200).json(reserve)
        }catch(err){
            return res.status(400).json({Error:err.message})
        }
    }

    async cancel(req: Request, res: Response){

        try{
            //const {id} = req.params
            const {id} = req.body
            const reserve = await this.reserveService.cancel({id})
            return res.status(200).json(reserve)
        }catch(err){
            return res.status(400).json({Error:err.message})
        }
    }

    async detail(req: Request, res: Response){

        try{
            //const {id} = req.params
            const {id} = req.body
            const reserve = await this.reserveService.detail({id})
            return res.status(200).json(reserve)
        }catch(err){
            return res.status(400).json({Error:err.message})
        }
    }

    async list(req: Request, res: Response){

        try{
            //const {id} = req.params
            const {reserveDay} = req.body
            const reserve = await this.reserveService.list({reserveDay})
            return res.status(200).json(reserve)
        }catch(err){
            return res.status(400).json({Error:err.message})
        }
    }
}

export {ReserveRoomTimeController}