import { UserService } from '../UserService';
import prismaClient from '../../prisma';

// Mock do prismaClient
jest.mock('../../prisma', () => ({
    user: {
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}));

describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService();
        jest.clearAllMocks(); // Limpa os mocks entre os testes
    });

    describe('create', () => {
        it('deve criar um usuário com sucesso', async () => {
            const mockUser = {
                id: '1',
                name: 'Yagho Petini',
                email: 'yagho@email.com',
            };

            (prismaClient.user.findFirst as jest.Mock).mockResolvedValue(null); 
            (prismaClient.user.create as jest.Mock).mockResolvedValue(mockUser); 
            const result = await userService.create({
                name: 'Yagho Petini',
                email: 'yagho@email.com',
                password: '123123',
            });

            expect(result).toEqual(mockUser);
            expect(prismaClient.user.findFirst).toHaveBeenCalledWith({
                where: { email: 'yagho@email.com' },
            });
            expect(prismaClient.user.create).toHaveBeenCalled();
        });

        it('deve lançar um erro se o email já existir', async () => {
            const mockUser = {
                id: '1',
                name: 'Yagho Petini',
                email: 'yagho@email.com',
            };

            (prismaClient.user.findFirst as jest.Mock).mockResolvedValue(mockUser);

            await expect(
                userService.create({
                    name: 'Yagho Petini',
                    email: 'yagho@email.com',
                    password: '123123',
                })
            ).rejects.toThrow('Usuario ja existe.');
        });
    });
});