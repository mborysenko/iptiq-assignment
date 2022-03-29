import {PrismaClient} from "@prisma/client";

export default function (client: PrismaClient) {
    const PATCH = async (request, response) => {
        const {params, body} = request;

        await client.$connect();

        const updatedDoodle = await client.doodle.update({
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
    };
    PATCH.apiDoc = {
        summary: 'Updates doodle by id.',
        operationId: 'updateDoodle',
        parameters: [
            {
                in: 'path',
                name: 'statusId',
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
            }
        }
    };

    const DELETE = async (request, response) => {
        const {params} = request;

        await client.$connect();

        await client.doodle.delete({
            where: {
                id: params.doodleId,
            }
        })

        response.json({removed: params.doodleId})
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
            }
        }
    };

    return {
        PATCH,
        DELETE,
    }
}
