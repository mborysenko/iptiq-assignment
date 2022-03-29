import {PrismaClient} from "@prisma/client";

export default function (client: PrismaClient) {
    async function GET(request, response) {
        const {params} = request;

        await client.$connect();
        const doodle = await client.doodle.findUnique({
            where: {
                id: params.statusId
            },
        })

        if (doodle) {
            response.json(doodle);
        } else {
            response.status(404).send('Doodle not found.')
        }
    }
    GET.apiDoc = {
        summary: 'Returns doodle by id.',
        operationId: 'getDoodle',
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
