import { Response, Request } from "express";
import { AuthUserService } from "../services/AuthUserService";

class AuthUserController{
    async auth(req: Request, res: Response){
        
        const {email, password} = req.body;

        const authUserService = new AuthUserService();

        const auth = await authUserService.authUser({email, password})

        return res.json(auth)
    }
}

export {AuthUserController}