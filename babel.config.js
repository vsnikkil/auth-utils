module.exports = api => {
    api.cache.forever();
    return {
        plugins: ["@babel/plugin-transform-modules-commonjs"],
    };
};
