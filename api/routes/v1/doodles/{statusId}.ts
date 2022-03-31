import {PrismaClient} from "@prisma/client";

export default function (client: PrismaClient) {
    async function GET(request, response) {
        const {params} = request;

        await client.$connect();
        const doodles = await client.doodle.findMany({
            where: {
                statusId: params.statusId
            },
        })

        if (doodles) {
            response.json(doodles);
        } else {
            response.status(404).send('Doodle not found.')
        }
    }
    GET.apiDoc = {
        summary: 'Returns list of doodles by status id.',
        operationId: 'getDoodles',
        parameters: [
            {
                in: 'path',
                name: 'statusId',
                required: true,
                type: 'string'
            }
        ],
        responses: {
            200: {
                description: 'A list of doodles that match the requested status.',
                schema: {
                    type: 'object',
                    items: {
                        $ref: '#/definitions/Doodle'
                    }
                }
            },
            404: {
                description: 'Doodle with specified ID hasn\'t been found',
                schema: {
                    additionalProperties: true
                }
            }
        }
    };

    return {
        GET,
    }
}
