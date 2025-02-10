import prismaClient from "../prisma"
import { hash } from "bcryptjs"

interface UserRequest{
    name:string,
    email:string,
    password:string
}

class UserService{
    async create({name, email, password}:UserRequest){

        if(!email){
            throw new Error("Email invalido")
        }

        const userAlreadyExist = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })

        if(userAlreadyExist){
            throw new Error("Usuario ja existe.")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name:name,
                email:email,
                password:passwordHash
            },

            select:{
                id:true,
                name:true,
                email:true
            }
        })

        return(user)
    }
    async detail(userId:string){

        const user = prismaClient.user.findFirst({
            where:{
                id:userId
            },
            select:{
                id:true,
                email:true,
                reserves:true,
                admin:true
            }
        })
        return user;
    }
}

export {UserService}