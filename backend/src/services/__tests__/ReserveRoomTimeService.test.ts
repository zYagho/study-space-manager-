import { ReserveRoomTimeService } from "../ReserveRoomTimeService";
import prismaClient from "../../prisma";


// Mock do prismaClient
jest.mock('../../prisma', () => ({
    reserve: {
        findFirst: jest.fn(),
    },
    time: {
        findFirst: jest.fn(),
    },
    room: {
        findFirst: jest.fn(),
    },
    reserveRoomTime: {
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    },
}));

describe('ReserveRoomTimeService', () => {
    let reserveRoomTimeService: ReserveRoomTimeService;

    beforeEach(() => {
        reserveRoomTimeService = new ReserveRoomTimeService();
        jest.clearAllMocks(); // Limpa os mocks entre os testes
    });

    describe('create', () => {
        it('deve criar uma reserva com sucesso', async () => {
            // Configura os mocks para simular que a reserva, horário e sala existem
            (prismaClient.reserve.findFirst as jest.Mock).mockResolvedValue({ id: '1', status: true });
            (prismaClient.time.findFirst as jest.Mock).mockResolvedValue({ id: '1' });
            (prismaClient.room.findFirst as jest.Mock).mockResolvedValue({ id: '1' });
            (prismaClient.reserveRoomTime.findFirst as jest.Mock).mockResolvedValue(null); // Nenhuma reserva conflitante

            // Configura o mock para simular a criação da reserva
            const mockReserve = {
                id: '1',
                room: { number: '101' },
                time: { horaInicio: '09:00', horaFim: '10:00' },
                reserveDay: new Date('2023-10-01'),
                reserve: { user: { name: 'John Doe', email: 'john@example.com' } },
            };
            (prismaClient.reserveRoomTime.create as jest.Mock).mockResolvedValue(mockReserve);

            // Chama o método create
            const result = await reserveRoomTimeService.create({
                reserveID: '1',
                timeID: '1',
                roomID: '1',
                reserveDay: new Date('2023-10-01'),
            });

            // Verifica se o resultado está correto
            expect(result).toEqual(mockReserve);

            // Verifica se o prismaClient foi chamado corretamente
            expect(prismaClient.reserve.findFirst).toHaveBeenCalledWith({ where: { id: '1' } });
            expect(prismaClient.time.findFirst).toHaveBeenCalledWith({ where: { id: '1' } });
            expect(prismaClient.room.findFirst).toHaveBeenCalledWith({ where: { id: '1' } });
            expect(prismaClient.reserveRoomTime.create).toHaveBeenCalled();
        });

        it('deve lançar um erro se a reserva não existir', async () => {
            // Configura o mock para simular que a reserva não existe
            (prismaClient.reserve.findFirst as jest.Mock).mockResolvedValue(null);

            // Verifica se o método create lança o erro correto
            await expect(
                reserveRoomTimeService.create({
                    reserveID: '1',
                    timeID: '1',
                    roomID: '1',
                    reserveDay: new Date('2023-10-01'),
                })
            ).rejects.toThrow('Reserva não existe.');
        });

        it('deve lançar um erro se o horário não existir', async () => {
            // Configura o mock para simular que a reserva existe, mas o horário não
            (prismaClient.reserve.findFirst as jest.Mock).mockResolvedValue({ id: '1', status: true });
            (prismaClient.time.findFirst as jest.Mock).mockResolvedValue(null);

            // Verifica se o método create lança o erro correto
            await expect(
                reserveRoomTimeService.create({
                    reserveID: '1',
                    timeID: '1',
                    roomID: '1',
                    reserveDay: new Date('2023-10-01'),
                })
            ).rejects.toThrow('Horário não existe.');
        });

        it('deve lançar um erro se a sala não existir', async () => {
            // Configura o mock para simular que a reserva e o horário existem, mas a sala não
            (prismaClient.reserve.findFirst as jest.Mock).mockResolvedValue({ id: '1', status: true });
            (prismaClient.time.findFirst as jest.Mock).mockResolvedValue({ id: '1' });
            (prismaClient.room.findFirst as jest.Mock).mockResolvedValue(null);

            // Verifica se o método create lança o erro correto
            await expect(
                reserveRoomTimeService.create({
                    reserveID: '1',
                    timeID: '1',
                    roomID: '1',
                    reserveDay: new Date('2023-10-01'),
                })
            ).rejects.toThrow('Sala não existe.');
        });

        it('deve lançar um erro se já existir uma reserva ativa no mesmo horário e sala', async () => {
            // Configura os mocks para simular que a reserva, horário e sala existem
            (prismaClient.reserve.findFirst as jest.Mock).mockResolvedValue({ id: '1', status: true });
            (prismaClient.time.findFirst as jest.Mock).mockResolvedValue({ id: '1' });
            (prismaClient.room.findFirst as jest.Mock).mockResolvedValue({ id: '1' });

            // Configura o mock para simular que já existe uma reserva ativa
            (prismaClient.reserveRoomTime.findFirst as jest.Mock).mockResolvedValue({
                id: '1',
                time_id: '1',
                reserve_id: '1',
                room_id: '1',
                status: true,
            });

            // Verifica se o método create lança um erro
            await expect(
                reserveRoomTimeService.create({
                    reserveID: '1',
                    timeID: '1',
                    roomID: '1',
                    reserveDay: new Date('2023-10-01'),
                })
            ).rejects.toThrow('Já existe uma reserva ativa nesse mesmo horário e sala.');
        });
    });

    describe('cancel', () => {
        it('deve cancelar uma reserva com sucesso', async () => {
            // Configura o mock para simular que a reserva existe
            (prismaClient.reserveRoomTime.findFirst as jest.Mock).mockResolvedValue({ id: '1', status: true });

            // Configura o mock para simular o cancelamento da reserva
            const mockCancelledReserve = { id: '1', status: false };
            (prismaClient.reserveRoomTime.update as jest.Mock).mockResolvedValue(mockCancelledReserve);

            // Chama o método cancel
            const result = await reserveRoomTimeService.cancel({ id: '1' });

            // Verifica se o resultado está correto
            expect(result).toEqual(mockCancelledReserve);

            // Verifica se o prismaClient foi chamado corretamente
            expect(prismaClient.reserveRoomTime.findFirst).toHaveBeenCalledWith({ where: { id: '1' } });
            expect(prismaClient.reserveRoomTime.update).toHaveBeenCalledWith({
                data: { status: false },
                where: { id: '1' },
            });
        });

        it('deve lançar um erro se o ID da reserva não for fornecido', async () => {
            // Verifica se o método cancel lança um erro
            await expect(reserveRoomTimeService.cancel({})).rejects.toThrow('O ID da reserve é obrigatório.');
        });

        it('deve lançar um erro se a reserva não existir', async () => {
            // Configura o mock para simular que a reserva não existe
            (prismaClient.reserveRoomTime.findFirst as jest.Mock).mockResolvedValue(null);

            // Verifica se o método cancel lança um erro
            await expect(reserveRoomTimeService.cancel({ id: '1' })).rejects.toThrow('Reserva de sala não encontrada.');
        });
    });
});