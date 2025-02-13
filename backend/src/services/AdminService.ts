import prismaClient from "../prisma"

interface AdminRequest{
    user_id: string,
    role?: string
}

class AdminService{

    async create({user_id, role}:AdminRequest){

        const userExist = await prismaClient.user.findFirst({
            where:{
                id:user_id
            }
        })
        if(!userExist){
            throw new Error("Usuário não encontrado!")
        }

        const adminExist = await prismaClient.admin.findFirst({
            where:{
                user_id:user_id
            }
        })
        if(adminExist){
            throw new Error("Usuário já é um administrador!")
        }

        if(!role){
            throw new Error("Função é obrigatória.")
        }

        const admin = await prismaClient.admin.create({
            data:{
                user_id:user_id,
                role:role
            }
        })
        return admin
    }
    async update({user_id, role}:AdminRequest){

        const adminExist = await prismaClient.admin.findFirst({
            where:{
                user_id:user_id
            }
        })

        if(!adminExist){
            throw new Error("Administrador não existe.")
        }

        if(!role){
            throw new Error("Função deve ser especificada.")
        }

        const updateAdmin = await prismaClient.admin.update({
            where:{
                user_id:user_id
            },
            data:{
                role:role
            }
        })
        return updateAdmin
    }
    async list(){
        const admins = await prismaClient.admin.findMany({
            select:{
                id:true,
                role:true,
                user:{
                    select:{
                        id:true,
                        name:true,
                        email:true
                    }
                }
            }
        })
        return admins
    }
    async detail({user_id}:AdminRequest){
        const user = await prismaClient.admin.findFirst({
            where:{
                user_id:user_id
            },
            select:{
                id:true,
                role:true,
                user:{
                    select:{
                        id:true,
                        name:true,
                        email:true
                    }
                }
            }
        })

        return user
    }
    async delete({user_id}:AdminRequest){
        const adminExist = await prismaClient.admin.findFirst({
            where:{
                user_id:user_id
            }
        })

        if(!adminExist){
            throw new Error("Administrador não existe.")
        }

        await prismaClient.admin.delete({
            where:{
                user_id:user_id
            }
        })

        return({message: "Administrador deletado com sucesso!"})
    }
}

export {AdminService}