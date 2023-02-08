module.exports = function override(config, env) {
    const NodePolyfillWebpackPlugin = require("node-polyfill-webpack-plugin");

    config.plugins.push(new NodePolyfillWebpackPlugin);

    config.resolve.fallback = {
        fs: false,
        readline: require.resolve('./_readline.js')
    }
    return config;
}