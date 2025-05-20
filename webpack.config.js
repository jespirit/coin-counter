const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/app/sketch.js',
  devServer: {
    static: './dist',
    port: 8080,
    // Note: This doesn't launch Chrome with user1 profile
    open: {
      app: {
        name: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        arguments: ['--user-data-dir', 'C:\\chrome_profiles\\user1']
      }
    },
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    }
  },
  devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash].css'
    })
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    // Default asset output path (e.g., for fonts, other media)
    assetModuleFilename: 'assets/[name][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // Rule for .css files
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Use style-loader and css-loader
      },
      {
        test: /\.png$/i, // Rule for .png files
        type: 'asset/resource', // Webpack 5 asset modules
        generator: {
          // Output png files to 'dist/assets/images/'
          filename: 'assets/images/[name][ext][query]'
        }
      },
      {
        test: /\.s[ac]ss$/i, // Rule for .scss or .sass files
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      // You can add similar rules for other image types (jpg, svg, etc.) if needed
      // {
      //   test: /\.(jpe?g|gif|svg)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'assets/images/[name][ext][query]'
      //   }
      // },
    ],
  },
  optimization: { // Add optimization section for CSS minification
    minimizer: [
      `...`, // This tells webpack to extend existing minimizers (like terser for JS)
      new CssMinimizerPlugin(),
    ],
    minimize: true
  },
  // Optional: Add devServer configuration for a better development experience
  // devServer: {
  //   static: './dist', // Serve content from the dist directory
  //   open: true, // Open the browser after server had been started
  // },
};