import {PrismaClient} from "@prisma/client";
import {string} from "yargs";

export default function (client: PrismaClient) {
    async function POST(request, response) {
        const {body} = request

        await client.$connect();
        const doodle = await client.doodle.create({
            data: {
                ...body,
            }
        });

        response.json(doodle);
    };
    POST.apiDoc = {
        summary: 'Creates new doodle.',
        operationId: 'createDoodle',
        parameters: [
            {
                in: 'body',
                name: 'data',
                schema: {
                    type: 'object',
                    properties: {
                        title: {
                            type: "string",
                        },
                        body: {
                            type: "string",
                        },
                        userId: {
                            type: "string",
                        },
                        categoryId: {
                            type: "string",
                        },
                        statusId: {
                            type: "string",
                        },
                    },
                    required: ["title", "userId", "statusId", "categoryId"],
                }
            }
        ],
        responses: {
            200: {
                description: 'Doodle that has just been created.',
                schema: {
                    type: 'object',
                    properties: {
                        id: {
                            type: "string",
                        },
                        name: {
                            type: "string",
                        },
                        body: {
                            type: "string",
                        },
                        userId: {
                            type: "string",
                        },
                        categoryId: {
                            type: "string",
                        },
                        statusId: {
                            type: "string",
                        },
                    },
                    required: ["id"],
                }
            },
            default: {
                description: 'An error occurred',
                schema: {
                    additionalProperties: true
                }
            }
        }
    };

    return {
        POST,
    }
}
