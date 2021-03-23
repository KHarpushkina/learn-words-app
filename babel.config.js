module.exports = {
    presets: ["@babel/preset-env"],
    plugins: [
        [
            "@babel/plugin-transform-async-to-generator",
            {
                module: "bluebird",
                method: "coroutine",
            },
        ],
    ],
    ignore: ["node_modules"],
};
