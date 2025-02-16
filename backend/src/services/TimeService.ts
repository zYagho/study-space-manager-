import prismaClient from "../prisma";

interface TimeRequest{
    id?:string,
    start?: string,
    end?: string
}

class TimesService{
    async create({start, end}: TimeRequest){

        if(!start) throw new Error("Horario de inicio é obrigatório.")
        if(!end) throw new Error("Horario final é obrigatório.")
        
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(start) || !timeRegex.test(end)) throw new Error("Formato de horário inválido. Use HH:mm.");

        if(start > end) throw new Error("Erro,horario inicial não pode ser maior que o final.");

        const time = await prismaClient.time.create({
            data:{
                horaInicio:start,
                horaFim:end
            },
            select:{
                id:true,
                horaInicio:true,
                horaFim:true
            }
        })

        return time
    }
    async update({id, start, end}: TimeRequest){

        if(!start) throw new Error("Horario de inicio é obrigatório.")
        if(!end) throw new Error("Horario final é obrigatório.")
        
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(start) || !timeRegex.test(end)) throw new Error("Formato de horário inválido. Use HH:mm.");
    
        if(start > end) throw new Error("Erro,horario inicial não pode ser maior que o final.");

        const time = await prismaClient.time.update({
            where:{
                id:id
            }
            ,data:{
                horaInicio:start,
                horaFim:end
            },
            select:{
                id:true,
                horaInicio:true,
                horaFim:true
            }
        })

        return time
    }
    async list(){
        return(
            await prismaClient.time.findMany({
                select:{
                    id:true,
                    horaInicio:true,
                    horaFim:true
                }
            })
        )
    }
    async delete({id}: TimeRequest){

        const timeExist = await prismaClient.time.findFirst({
            where:{
                id:id
            }
        })

        if(!timeExist) throw new Error("ID do horario é obrigatório.")

        const time = await prismaClient.time.delete({
            where:{
                id:id
            }
        })

        return {message: "Horario exlcuído com sucesso."}
    }
}

export {TimesService}