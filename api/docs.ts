export default {
    swagger: "2.0",
    basePath: "/",
    info: {
        title: "Doodles API.",
        version: "1.0.0",
    },
    definitions: {
        Doodle: {
            type: "object",
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
        },
    },
    paths: {},
};
