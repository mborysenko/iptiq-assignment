import webpackConfigFactory from '../webpack/config-factory';
import webpack from 'webpack';

/**
 * Package current project.
 * @module package-project
 * @param {Object} props Build props.
 */
export default function bundle(props) {
    return (done) => {
        webpack(webpackConfigFactory(props), (error, stats) => {
            if(error) {
                done?.(error);
            } else {
                console.log(stats!.toString({
                    chunks: false,
                    colors: true
                }));
            }
        });

        done?.();
    }
}
