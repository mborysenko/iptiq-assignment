import express from 'express'

import {PrismaClient} from '@prisma/client';
import bodyParser from 'body-parser';

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

app.get('/heartbeat', (request, response) => {
    response.json({active: true})
});
/**
 * Gets list of doodles.
 */
app.get('/doodles/:status?', async (request, response) => {
    const {params} = request

    await prisma.$connect();
    const doodles = await prisma.doodle.findMany({
        where: {
            statusId: params.status
        }
    });

    response.json(doodles);
});

app.route('/doodle/:id')
    .get(async (request, response) => {
        const {params} = request;

        await prisma.$connect();
        const doodle = await prisma.doodle.findUnique({
            where: {
                id: params.id
            },
        })

        if (doodle) {
            response.json(doodle);
        } else {
            response.status(404).send('Doodle not found.')
        }
    })
    .patch(async (request, response) => {
        const {params, body} = request;

        await prisma.$connect();

        const updatedDoodle = await prisma.doodle.update({
            where: {
                id: params.id
            },
            data: {
                ...body,
            },
            select: {
                id: true,
                title: true,
                body: true,
            }
        })

        response.json(updatedDoodle);
    })
    .delete(async (request, response) => {
        const {params} = request;

        await prisma.$connect();

        await prisma.doodle.delete({
            where: {
                id: params.id,
            }
        })

        response.json({removed: params.id})
    });

export {
    app,
}
