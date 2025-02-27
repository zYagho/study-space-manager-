import { ReserveRoomTimeService } from "../ReserveRoomTimeService";
import prismaClient from "../../prisma";

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
        jest.clearAllMocks(); 
    });

    describe('create', () => {
        it('deve criar uma reserva com sucesso', async () => {
            (prismaClient.reserve.findFirst as jest.Mock).mockResolvedValue({ id: '1', status: true });
            (prismaClient.time.findFirst as jest.Mock).mockResolvedValue({ id: '1' });
            (prismaClient.room.findFirst as jest.Mock).mockResolvedValue({ id: '1' });
            (prismaClient.reserveRoomTime.findFirst as jest.Mock).mockResolvedValue(null); 
            const mockReserve = {
                id: '1',
                room: { number: '101' },
                time: { horaInicio: '09:00', horaFim: '10:00' },
                reserveDay: new Date('2025-10-01'),
                reserve: { user: { name: 'Yagho Petini', email: 'yagho@email.com' } },
            };
            (prismaClient.reserveRoomTime.create as jest.Mock).mockResolvedValue(mockReserve);

            const result = await reserveRoomTimeService.create({
                reserveID: '1',
                timeID: '1',
                roomID: '1',
                reserveDay: new Date('2025-10-01'),
            });

            expect(result).toEqual(mockReserve);

            expect(prismaClient.reserve.findFirst).toHaveBeenCalledWith({ where: { id: '1' } });
            expect(prismaClient.time.findFirst).toHaveBeenCalledWith({ where: { id: '1' } });
            expect(prismaClient.room.findFirst).toHaveBeenCalledWith({ where: { id: '1' } });
            expect(prismaClient.reserveRoomTime.create).toHaveBeenCalled();
        });

        it('deve lançar um erro se a reserva não existir', async () => {
            (prismaClient.reserve.findFirst as jest.Mock).mockResolvedValue(null);

            await expect(
                reserveRoomTimeService.create({
                    reserveID: '1',
                    timeID: '1',
                    roomID: '1',
                    reserveDay: new Date('2025-10-01'),
                })
            ).rejects.toThrow('Reserva não existe.');
        });

        it('deve lançar um erro se o horário não existir', async () => {
            (prismaClient.reserve.findFirst as jest.Mock).mockResolvedValue({ id: '1', status: true });
            (prismaClient.time.findFirst as jest.Mock).mockResolvedValue(null);

            await expect(
                reserveRoomTimeService.create({
                    reserveID: '1',
                    timeID: '1',
                    roomID: '1',
                    reserveDay: new Date('2025-10-01'),
                })
            ).rejects.toThrow('Horário não existe.');
        });

        it('deve lançar um erro se a sala não existir', async () => {
            (prismaClient.reserve.findFirst as jest.Mock).mockResolvedValue({ id: '1', status: true });
            (prismaClient.time.findFirst as jest.Mock).mockResolvedValue({ id: '1' });
            (prismaClient.room.findFirst as jest.Mock).mockResolvedValue(null);

            await expect(
                reserveRoomTimeService.create({
                    reserveID: '1',
                    timeID: '1',
                    roomID: '1',
                    reserveDay: new Date('2025-10-01'),
                })
            ).rejects.toThrow('Sala não existe.');
        });

        it('deve lançar um erro se já existir uma reserva ativa no mesmo horário e sala', async () => {
            
            (prismaClient.reserve.findFirst as jest.Mock).mockResolvedValue({ id: '1', status: true });
            (prismaClient.time.findFirst as jest.Mock).mockResolvedValue({ id: '1' });
            (prismaClient.room.findFirst as jest.Mock).mockResolvedValue({ id: '1' });

            (prismaClient.reserveRoomTime.findFirst as jest.Mock).mockResolvedValue({
                id: '1',
                time_id: '1',
                reserve_id: '1',
                room_id: '1',
                status: true,
            });

            await expect(
                reserveRoomTimeService.create({
                    reserveID: '1',
                    timeID: '1',
                    roomID: '1',
                    reserveDay: new Date('2025-10-01'),
                })
            ).rejects.toThrow('Já existe uma reserva ativa nesse mesmo horário e sala.');
        });
    });

    describe('cancel', () => {
        it('deve cancelar uma reserva com sucesso', async () => {
            (prismaClient.reserveRoomTime.findFirst as jest.Mock).mockResolvedValue({ id: '1', status: true });

            const mockCancelledReserve = { id: '1', status: false };
            (prismaClient.reserveRoomTime.update as jest.Mock).mockResolvedValue(mockCancelledReserve);

            const result = await reserveRoomTimeService.cancel({ id: '1' });

            expect(result).toEqual(mockCancelledReserve);

            expect(prismaClient.reserveRoomTime.findFirst).toHaveBeenCalledWith({ where: { id: '1' } });
            expect(prismaClient.reserveRoomTime.update).toHaveBeenCalledWith({
                data: { status: false },
                where: { id: '1' },
            });
        });

        it('deve lançar um erro se o ID da reserva não for fornecido', async () => {
            
            await expect(reserveRoomTimeService.cancel({})).rejects.toThrow('O ID da reserve é obrigatório.');
        });

        it('deve lançar um erro se a reserva não existir', async () => {

            (prismaClient.reserveRoomTime.findFirst as jest.Mock).mockResolvedValue(null);
            await expect(reserveRoomTimeService.cancel({ id: '1' })).rejects.toThrow('Reserva de sala não encontrada.');
        });
    });
});