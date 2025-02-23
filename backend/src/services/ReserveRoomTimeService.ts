import prismaClient from "../prisma"

interface ReserveRequest{
    id?:string,
    reserveID?: string,
    roomID?: string,
    timeID?: string,
    reserveDay?: Date
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

        const dataReserva = new Date(reserveDay)

        const reserveAlreadyExist = await prismaClient.reserveRoomTime.findFirst({
            where:{
                reserveDay: dataReserva,
                time_id:timeID,
                reserve_id:reserveID,
                room_id:roomID,
                status:true
            }
        })
        if(reserveAlreadyExist && reserveAlreadyExist.time_id === timeID  && reseveIDExist.status == true){
            throw new Error("Já existe uma reserva ativa nesse mesmo horário e sala.")
        }

        const reserve = prismaClient.reserveRoomTime.create({
            data:{
                room: {
                    connect: { id: roomID }, 
                  },
                time: {
                    connect: { id: timeID },
                  },
                reserve: {
                    connect: { id: reserveID },
                  },
                reserveDay:dataReserva,
                status:true
            },
            select:{
                id:true,
                room:{
                    select:{
                        number:true
                    }
                },
                time:{
                    select:{
                        horaInicio:true,
                        horaFim:true
                    }
                },
                reserveDay:true,
                reserve:{
                    select:{
                        user:{
                            select:{
                                name:true,
                                email:true
                            }
                        }
                    }
                }
            }
        })
        return reserve
    }

    async cancel({id}:ReserveRequest){
        if(!id){
            throw new Error("O ID da reserve é obrigatório.")
        }

        const reserveAlreadyExist = await prismaClient.reserveRoomTime.findFirst({
            where:{
                id:id
            }
        })

        if(!reserveAlreadyExist){
            throw new Error("Reserva de sala não encontrada.")
        }

        const reserveCanc = await prismaClient.reserveRoomTime.update({
            data:{
                status:false
            },
            where:{
                id:id
            }
        })

        return reserveCanc
    }

    async detail({id}: ReserveRequest){

        const reserveAlreadyExist = await prismaClient.reserveRoomTime.findFirst({
            where:{
                id:id,
                //status:true
            },
            select:{
                id:true,
                reserveDay:true,
                status:true,
                reserve:{
                    select:{
                        user:{
                            select:{
                                email:true,
                                name:true
                            }
                        }
                    }
                }
            }
        })

        return reserveAlreadyExist
    }
}

export {ReserveRoomTimeService}