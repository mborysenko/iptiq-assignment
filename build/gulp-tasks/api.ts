import { start } from '../../api/start'

/**
 * Setup a server and run it.
 * @module serve
 * @param {Object} props Build props.
 */
export default function (props) {
    let {
        api,
    } = props;

    return function (done) {
        start(api.port, done);
    };
};
