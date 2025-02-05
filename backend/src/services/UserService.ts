import prismaClient from "../prisma"

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

        const user = await prismaClient.user.create({
            data:{
                name:name,
                email:email,
                password:password
            },

            select:{
                id:true,
                name:true,
                email:true
            }
        })

        return(user)
    }
}

export {UserService}