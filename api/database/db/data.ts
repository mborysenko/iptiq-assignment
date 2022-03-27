import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const addExampleData = async () => {
    await prisma.$connect();

    await prisma.category.createMany({
        data: [{
            name: "Fixing apartments",
        },{
            name: "Shopping",
        },{
            name: "Garden",
        }]
    });

    await prisma.status.createMany({
        data: [{
            name: "To do",
        },{
            name: "In progress",
        },{
            name: "Done",
        }]
    });

    await prisma.user.createMany({
        data: [{
            name: "Maks Borysenko",
        },{
            name: "John Doe",
        },{
            name: "Chuck Norris",
        }]
    });

    const todoStatus = await prisma.status.findFirst({
        select: {
            id: true
        },
        where: {
            name: "To do",
        }
    });

    const maks = await prisma.user.findFirst({
        select: {
            id: true
        },
        where: {
            name: "Maks Borysenko",
        }
    });

    const john = await prisma.user.findFirst({
        select: {
            id: true
        },
        where: {
            name: "John Doe",
        }
    });

    const apartments = await prisma.category.findFirst({
        select: {
            id: true
        },
        where: {
            name: "Fixing apartments",
        }
    });

    await prisma.doodle.createMany({
        data: [{
            title: "To hang wallpapers",
            body: "Buy ",
            userId: maks?.id!,
            categoryId: apartments?.id!,
            statusId: todoStatus?.id!,
        }, {
            title: "To paint walls",
            body: "Buy paint, brushes, bucket and paint walls in living room",
            userId: maks?.id!,
            categoryId: apartments?.id!,
            statusId: todoStatus?.id!,
        }]
    });

    await prisma.doodle.createMany({
        data: [{
            title: "To lay the floor",
            body: "Buy laminate, and lay it on  the first floor",
            userId: john?.id!,
            categoryId: apartments?.id!,
            statusId: todoStatus?.id!,
        }, {
            title: "To replace the windows on the first floor",
            body: "Setup new skylights in the kids' rooms",
            userId: john?.id!,
            categoryId: apartments?.id!,
            statusId: todoStatus?.id!,
        }]
    });
}

addExampleData().then(() => {
    console.log("Example data has been added to the database.")
})
    .catch((error) => {
        throw error;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
