let mix = require('laravel-mix');
const glob = require('glob');

mix.webpackConfig({
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': __dirname + '/resources/assets/js/imports',
    },
  },
});

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

glob.sync('resources/assets/js/entries/*.js').forEach(file => mix.js(file, 'public/assets/js'));
mix.sass('resources/assets/sass/app.scss', 'public/assets/css');
