module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
