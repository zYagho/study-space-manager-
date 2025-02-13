import { Request, Response } from "express";
import { AdminService } from "../services/AdminService";

class AdminController{

    private adminService: AdminService;
    constructor(){
        this.adminService = new AdminService();
    }

    async create(req: Request, res: Response){
        try {
            const {user_id, role} = req.body

            const admin = await this.adminService.create({
                user_id,
                role
            })
            return res.status(201).json(admin)
        } catch (error) {
            res.status(400).json({err:error.message})
        }
    }
    async update(req: Request, res: Response){
        try{
            const user_id = req.user_id

            const {role} = req.body
            console.log(user_id, role)            
            const updateAdmin = await this.adminService.update({user_id, role});

            return res.status(200).json(updateAdmin)
        }catch(error){
            res.status(400).json({err:error.message})
        }
    }
    async list(req: Request, res: Response){
        try{
            const admins = await this.adminService.list()

            return res.status(200).json(admins)
        }catch(error){
            res.status(400).json({err:error.message})
        }
    }

    async detail(req: Request, res: Response){
        try{
            const user_id = req.user_id
            
            const user = await this.adminService.detail({user_id});
            
            res.status(200).json(user)
        }
        catch(error){
            res.status(400).json({err:error.message})
        }
    }
    async delete(req: Request, res: Response){

        try{

            const user_id = req.user_id
            const deleteAdmin = await this.adminService.delete({user_id})
            
            return res.status(200).json(deleteAdmin)
        }catch(error){
            res.status(400).json({err:error.message})
        }
    }
}

export {AdminController}