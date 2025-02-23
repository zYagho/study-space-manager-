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
            console.log(reserve)
            return res.status(200).json(reserve)
        }catch(err){
            return res.status(400).json({Error:err.message})
        }
    }
}

export {ReserveRoomTimeController}