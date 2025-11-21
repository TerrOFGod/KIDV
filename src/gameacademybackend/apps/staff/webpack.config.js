const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/staff'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ],
  ignoreWarnings: [
    /Failed to parse source map/,
    { module: /node_modules\/snappy\// },
    // Игнорировать предупреждения, связанные с ws или socket.io-adapter
    { module: /node_modules\/socket\.io-adapter\// },
    { module: /node_modules\/ws\// },
    { module: /node_modules\/@mongodb-js\/zstd\// },
    { module: /node_modules\/kerberos\// },
    { module: /node_modules\/mongodb-client-encryption\// },
    // Отсутствующий опциональный модуль AWS SDK в MongoDB
    { message: /Can't resolve '@aws-sdk\/credential-providers'/ },
    // Critical dependency warnings от NestJS и Express
    { message: /Critical dependency: the request of a dependency is an expression/ },
  ],
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader',
      },
    ],
  },
};
