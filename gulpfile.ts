import { configuration } from './configuration';
import * as fs from 'fs-extra';
import gulp from 'gulp';
import clean from 'gulp-clean';

import bundle from './build/gulp-tasks/bundle';
import start from './build/gulp-tasks/serve';
import jest from './build/gulp-tasks/jest';
import eslint from './build/gulp-tasks/eslint';
import api from './build/gulp-tasks/api';

gulp.task("clean", (done) => {
    const { dist, filesToClean } = configuration;
    console.log(`Removing ${dist} folder...`);
    fs.removeSync(dist);

    return gulp.src(filesToClean)
        .pipe(clean())
        .on('end', done);
});

gulp.task("build", (done) => {
    bundle(configuration)(done);
});

gulp.task("api", (done) => {
    api(configuration)(done);
});

gulp.task("start", (done) => {
    start(configuration, done);
});

gulp.task("test", (done) => {
    jest(configuration)(done);
});

gulp.task('eslint', (cb) => {
    eslint(configuration)(cb);
});

gulp.task('eslint:fix', (cb) => {
    eslint(configuration, true)(cb);
});

gulp.task("default", gulp.series("clean", "eslint", "build", (done) => done()));


