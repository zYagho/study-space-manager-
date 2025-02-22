import prismaClient from "../prisma"

interface RoomRequest{
    id?:string,
    number: number
}

class RoomService{

    async create({number}:RoomRequest){
        
        if(!number) throw new Error("Nome da sala é obrigatório.");

        const roomExist = await prismaClient.room.findFirst({
            where:{
                number:number
            }
        })

        if(roomExist){
            throw new Error("Sala já existente.");
        }
        const room = await prismaClient.room.create({
            data:{
                number:number,
                status:true,
                
            }
        })

        return room;
    }

    async list(){

        const room = await prismaClient.room.findMany()

        return room;
    }

    async update({id, number}:RoomRequest){
        
        if(!id) throw new Error("Nome da sala é obrigatório.");

        const roomExist = await prismaClient.room.findFirst({
            where:{
                id:id
            }
        })

        if(!roomExist) throw new Error("Sala não existe.");

        const room = await prismaClient.room.update({
            where:{
                id:id
            },
            data:{
                number:number
            }
        })
        

        return room;
    }

    async delete({id}){
        if(!id) throw new Error("Nome da sala é obrigatório.");

        const roomExist = await prismaClient.room.findFirst({
            where:{
                id:id
            }
        })

        if(!roomExist) throw new Error("Sala não existe.");

        const room = await prismaClient.room.delete({
            where:{
                id:id
            }
        })
        return ({message: "Sala excluída com sucesso."})
    }

    async listActiveRooms(){

        const roomsActive = await prismaClient.room.findMany({
            where:{
                status:true
            }
        })

        return roomsActive
    }
}


export {RoomService}