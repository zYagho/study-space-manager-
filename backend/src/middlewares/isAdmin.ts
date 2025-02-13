import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "../prisma";

interface Payload{
    sub:string
}

export async function isAdmin(req: Request, res: Response, next: NextFunction){
    
    const authtoken = req.headers.authorization;
    if(!authtoken){
        return res.status(400).json({error: "É necessário informar um token"});
    }
    const [, token] = authtoken.split(" ");
    try{
        const {sub} =  verify(token, process.env.JWT_SECRET) as Payload;
        
        const adminExist = await prismaClient.admin.findFirst({
            where:{
                user_id:sub
            }
        })
        
        if(!adminExist){
            return res.status(400).json({error: "Você não é um administrador."});
        }

        return next();

    }catch(err){
        return res.status(400).json({error: "Token inválido."});
    }
}