import { Reserve } from "@prisma/client";
import prismaClient from "../prisma";

interface ReserveRequest{
    userEmail?: string,
    id?:string
}

class ReserveService{

    async create({userEmail}:ReserveRequest){

        const userExist = await prismaClient.user.findFirst({
            where:{
                email:userEmail
            }
        })

        if(!userExist) throw new Error("Usuário não existe.")

        const reserve = await prismaClient.reserve.create({
            data:{
                user_id:userExist.id
            },
            select:{
                id:true,
                user_id:true,
                user:{
                    select:{
                        email:true,
                        name:true
                    }
                }
            }
        })
        return(reserve)
    }

    async update(){

    }

    async delete({id}:ReserveRequest){
        const reserve = await prismaClient.reserve.delete({
            where:{
                id:id
            }
        })

        return ({message: "Reserva excluída com sucesso."})
    }

    async list(){
        const reserves = prismaClient.reserve.findMany()

        return(reserves)
    }

    async listReserveUser({userEmail}:ReserveRequest){

        const reserves = prismaClient.reserve.findMany({
            where:{
                user:{
                    email:userEmail
                }
            },
            select:{
                id:true,
                create_at:true,
                user:{
                    select:{
                        name:true,
                        email:true
                    }
                }
            }
        })

        return(reserves)
    }
}

export {ReserveService}