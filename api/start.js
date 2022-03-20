import express from 'express';

const app = express();

app.get('/heartbeat', (request, response) => {
    response.json({ active: true })
})

export const start = (port, cb) => {
    app.listen(port, (error) => {
        if (error) {
            console.error(error);
            cb?.(error);
            process.exit(1);
        }

        console.log('Rest API has started!');
        cb?.(error);
    });
}
