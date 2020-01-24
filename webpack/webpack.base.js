const path = require("path");
const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { NODE_ENV } = process.env;

module.exports = {
	entry: {
		bundle: [path.resolve("src", "index.js"), "@babel/polyfill"]
	},
	output: {
		filename: "assets/js/[name].[hash].js",
		path: path.resolve("dist")
	},
	resolve: {
		extensions: [
			".js",
			".jsx",
			".sass",
			".scss",
			".css",
			".json",
			".pug",
			".html"
		]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader"
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[hash].[ext]",
							outputPath: "./assets/fonts"
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			isDevelopment: JSON.stringify(NODE_ENV === "development"),
			isProduction: JSON.stringify(NODE_ENV === "production")
		}),
		new WebpackBar({
			name: "Building",
			color: "#FF3399"
		})
	],
	optimization: {
		splitChunks: {
			name: true,
			cacheGroups: {
				vendors: {
					name: "vendor",
					test: /node_modules/,
					chunks: "all",
					enforce: true
				}
			}
		}
	}
};
