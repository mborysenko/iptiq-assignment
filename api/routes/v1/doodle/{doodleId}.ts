import {PrismaClient} from "@prisma/client";

export default function (client: PrismaClient) {
    async function GET(request, response) {
        const {params} = request;

        await client.$connect();
        try {
            const doodle = await client.doodle.findUnique({
                where: {
                    id: params.doodleId
                },
            })

            if (doodle) {
                response.json(doodle);
            } else {
                response.status(404).send('Doodle not found.')
            }
        } catch (error) {
            response.status(400).send(error);
        }
    }

    GET.apiDoc = {
        summary: 'Returns doodle by id.',
        operationId: 'getDoodle',
        parameters: [
            {
                in: 'path',
                name: 'doodleId',
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
            },
            400: {
                description: 'Bad request',
                schema: {
                    additionalProperties: true
                }
            },
        }
    };

    const PATCH = async (request, response) => {
        const {params, body} = request;

        await client.$connect();

        try {
            const updatedDoodle = await client.doodle.update({
                where: {
                    id: params.doodleId
                },
                data: {
                    ...body,
                },
                select: {
                    id: true,
                    title: true,
                    body: true,
                    statusId: true,
                }
            })

            response.json(updatedDoodle);
        } catch (error) {
            response.status(400).send(error);
        }
    };
    PATCH.apiDoc = {
        summary: 'Updates doodle by id.',
        operationId: 'updateDoodle',
        parameters: [
            {
                in: 'path',
                name: 'doodleId',
                required: true,
                type: 'string'
            }, {
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
                    required: [],
                }
            }
        ],
        responses: {
            200: {
                description: 'A doodle that has been updated.',
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
            },
            400: {
                description: 'Bad request',
                schema: {
                    additionalProperties: true
                }
            },
        }
    };

    const DELETE = async (request, response) => {
        const {params} = request;

        await client.$connect();

        try {
            await client.doodle.delete({
                where: {
                    id: params.doodleId,
                }
            });

            response.json({removed: params.doodleId});

        } catch (error) {
            response.status(400).send(error);
        }
    };

    DELETE.apiDoc = {
        summary: 'Deletes doodle by id.',
        operationId: 'deleteDoodle',
        parameters: [
            {
                in: 'path',
                name: 'doodleId',
                required: true,
                type: 'string'
            },
        ],
        responses: {
            200: {
                description: 'ID of the doodle that has been deleted.',
                schema: {
                    type: 'object',
                    properties: {
                        removed: {
                            type: "string",
                        },
                    },
                    required: ["removed"],
                }
            },
            404: {
                description: 'Doodle with specified ID hasn\'t been found',
                schema: {
                    additionalProperties: true
                }
            },
            400: {
                description: 'Bad request',
                schema: {
                    additionalProperties: true
                }
            },
        }
    };

    return {
        PATCH,
        DELETE,
    }
}
