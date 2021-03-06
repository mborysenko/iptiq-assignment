import { app } from './index'

export const start = (port, callback) => {
    try {
        app.listen(port, () => {
            console.log('Rest API has started! Push CTRL+C to exit.');
        })
    } catch (error) {
        callback?.(error);
    }
}
