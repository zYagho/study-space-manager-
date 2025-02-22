import prismaClient from "../prisma"

interface ReserveRequest{
    reserveID: string,
    roomID: string,
    timeID: string,
    reserveDay: Date
}

class ReserveRoomTimeService{
    async create({reserveID, timeID, roomID, reserveDay}: ReserveRequest){

        if(!reserveID || !timeID || !roomID) {
            throw new Error("É Necessário ter a reserva, o horário e a sala para continuar com o processo.")
        }

        const reseveIDExist = await prismaClient.reserve.findFirst({
            where:{
                id:reserveID
            }
        })
        if(!reseveIDExist) throw new Error("Reserva não existe.")

        const timeExist = await prismaClient.time.findFirst({
            where:{
                id:timeID
            }
        })
        if(!timeExist) throw new Error("Horário não existe.")

        const roomIDExist = await prismaClient.room.findFirst({
            where:{
                id:roomID
            }
        })
        if(!roomIDExist) throw new Error("Sala não existe.")

        const reserve = prismaClient.reserveRoomTime.create({
            data:{
                room: {
                    connect: { id: roomID }, // Conecta a sala existente
                  },
                time: {
                    connect: { id: timeID }, // Conecta o horário existente
                  },
                reserve: {
                    connect: { id: reserveID }, // Conecta a reserva existente
                  },
                reserveDay:reserveDay,
                status:true
            }
        })
        return reserve
    }
}

export {ReserveRoomTimeService}