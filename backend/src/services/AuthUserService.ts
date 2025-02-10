import prismaClient from "../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

interface AuthRequest{
    email: string,
    password: string
}

class AuthUserService{
    async authUser({email, password}:AuthRequest){

        const user = await prismaClient.user.findFirst(
            {
                where:{
                    email:email
                }
            }
        )

        if(!user){
            throw new Error("Email/Senha incorreta")
        }

        const passHashMatch = await compare(password, user.password)

        if(!passHashMatch){
            throw new Error("Email/Senha incorreta")
        }

        //Gerar um Token JWT
        const token = sign(
            {
                name:user.name,
                email:user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn:'10d'
            }
            
        )
        return{
            id:user.id,
            name:user.name,
            email:user.email,
            token:token
        }
    }
}

export {AuthUserService}