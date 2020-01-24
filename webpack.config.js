// Packages
const webpackMerge = require('webpack-merge');

// Configs
const base = require('./build/webpack.base');
const development = require('./build/webpack.development');
const production = require('./build/webpack.production');

// Envs
const { NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === 'development';
const isProduction = NODE_ENV === 'production';

// Merge
if (isDevelopment) {
    module.exports = webpackMerge(base, development);
} else if (isProduction) {
    module.exports = webpackMerge(base, production);
}
