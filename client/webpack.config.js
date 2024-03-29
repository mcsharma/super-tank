module.exports = {
    entry: './src/ts/index.tsx',
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      static: './',
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.less$/i,
          use: [
            // compiles Less to CSS
            "style-loader",
            "css-loader",
            "less-loader",
          ],
        },
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
  };

// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var webpack = require('webpack');

// module.exports = {
//     entry: "./src/ts/app",
//     output: {
//         path: "./dist",
//         filename: "js/app.bundle.js"
//     },

//     // Enable sourcemaps for debugging webpack's output.
//     devtool: "source-map",

//     resolve: {
//         extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
//     },

//     module: {
//         loaders: [
//             {
//                 test: /\.tsx?$/, 
//                 loader: "ts-loader" 
//             },
//             { 
//                 test: /\.css$/, 
//                 loader: ExtractTextPlugin.extract("style-loader", "css-loader")
//             },
//             {
//                 test: /\.less$/,
//                 loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
//             }
//         ],

//         preLoaders: [
//             // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
//             { test: /\.js$/, loader: "source-map-loader" }
//         ]
//     },

//     plugins: [
//       new ExtractTextPlugin("css/bundle.css")
//     ],

//     externals: {
//         "react": "React",
//         "react-dom": "ReactDOM",
//         "lodash": "_",
//         "jquery": "$"
//     },
//     devServer: {
//         proxy: {
//             '/api': {
//                 target: 'localhost',
//                 secure: false
//             }
//         }
//     }
// };

