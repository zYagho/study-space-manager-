import prismaClient from "../prisma"
import { hash } from "bcryptjs"

interface UserRequest{
    id?:string,
    name?:string,
    email?:string,
    password?:string
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
    async update({id,name, password}:UserRequest){
       
        if(!id){
            throw new Error("ID do usuário é obrigatório.")
        }

        const userExist = await prismaClient.user.findFirst({
            where:{
                id:id
            }
        })

        if(!userExist){
            throw new Error("Usuário não existe.")
        }

        //const passwordHash = await hash(password, 8)

        const userUpdated = await prismaClient.user.update({
            where:{
                id:id
            },
            data:{
                name:name,
                password:password
            },
            select:{
                id:true,
                name:true,
                email:true
            }
        })

        return userUpdated
    }
    async delete({id}:UserRequest){

        try {
            if(!id){
                throw new Error("ID obrigatório");
            }

            const userExist = await prismaClient.user.findFirst({
                where:{
                    id:id
                }
            })

            if(!userExist){
                throw new Error("Usuário não encontrado.")
            }

            const user = await prismaClient.user.delete({
                where:{
                    id:id
                }
            })
            return {Message:"Usuário deletado com sucesso."}
        }
        catch{
            return {Message:"Não foi possível deletar o usuário"}
        }
    }
    async detail(userId:string){

        const user = prismaClient.user.findFirst({
            where:{
                id:userId
            },
            select:{
                id:true,
                email:true,
                name:true
            }
        })
        return user;
    }
}

export {UserService}