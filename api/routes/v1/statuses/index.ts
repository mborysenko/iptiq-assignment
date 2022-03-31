import {PrismaClient} from "@prisma/client";

export default function (client: PrismaClient) {
    async function GET(request, response) {
        await client.$connect();
        const statuses = await client.status.findMany();

        if (statuses) {
            response.json(statuses);
        } else {
            response.status(404).send('Statuses haven\'t been found.')
        }
    }
    GET.apiDoc = {
        summary: 'Returns list of statuses.',
        operationId: 'getStatuses',
        parameters: [],
        responses: {
            200: {
                description: 'A list of statuses.',
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/Status'
                    }
                }
            },
            404: {
                description: 'Statuses haven\'t been found',
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
