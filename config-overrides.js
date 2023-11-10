import { ProvidePlugin } from "webpack";

// eslint-disable-next-line no-undef
export default function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    // eslint-disable-next-line no-undef
    crypto: require.resolve("crypto-browserify"),
    // eslint-disable-next-line no-undef
    stream: require.resolve("stream-browserify"),
    // eslint-disable-next-line no-undef
    assert: require.resolve("assert"),
    // eslint-disable-next-line no-undef
    http: require.resolve("stream-http"),
    // eslint-disable-next-line no-undef
    https: require.resolve("https-browserify"),
    // eslint-disable-next-line no-undef
    os: require.resolve("os-browserify"),
    // eslint-disable-next-line no-undef
    url: require.resolve("url"),
    // eslint-disable-next-line no-undef
    zlib: require.resolve("zlib-browserify"),
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  config.ignoreWarnings = [/Failed to parse source map/];
  config.module.rules.push({
    test: /\.(js|mjs|jsx)$/,
    enforce: "pre",
    // eslint-disable-next-line no-undef
    loader: require.resolve("source-map-loader"),
    resolve: {
      fullySpecified: false,
    },
  });
  return config;
}
