import { PrismaClient } from '@prisma/client';
import { Agenda } from "@hokify/agenda";
import { db } from '../db';
import { api } from '~/trpc/server';

export enum AgendaNames {
    EXPIRE_BOOKING = "EXPIRE_BOOKING"
}


const agenda = new Agenda({
    db: { address: process.env.DATABASE_URL!, collection: 'jobCollection' }, // MongoDB connection string
    processEvery: '5 seconds', // Adjust this according to your needs
});

// Define a job for handling transaction expiry
agenda.define(AgendaNames.EXPIRE_BOOKING, async (job) => {
    try {
        const { bookingId, carId } = job.attrs.data;
        const res = db.booking.update({ where: { id: bookingId }, data: { status: 'EXPIRED' } })
        const res2 = db.car.update({ where: { id: carId }, data: { availability: 'AVAILABLE' } })
        await Promise.all([res, res2])
    } catch (error) {
        console.error(error, '=====');
    }

});

// Start Agenda
(async () => {
    await agenda.start().then(val => {
        console.log(val, 'Success Agenda');

    });
})();


export { agenda };
