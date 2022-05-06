const { ProvidePlugin } = require("webpack");

module.exports = {
  webpack: function (config, env) {
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.oneOf instanceof Array) {
        rule.oneOf[rule.oneOf.length - 1].exclude = [
          /\.(js|mjs|jsx|cjs|ts|tsx)$/,
          /\.html$/,
          /\.json$/,
        ];
      }
      return rule;
    });

    config.plugins = [
      ...config.plugins,
      new ProvidePlugin({
        process: "process/browser",
      }),
    ];

    config.resolve = {
      ...config.resolve,
      fallback: {
        assert: require.resolve("assert"),
        buffer: require.resolve("buffer"),
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
        os: false,
        fs: false,
      },
    };

    config.ignoreWarnings = [/Failed to parse source map/];

    return config;
  },
};