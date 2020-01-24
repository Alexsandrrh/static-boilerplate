const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.pug/,
				loader: 'pug-loader',
				options: {
					pretty: true
				}
			},
			{
				test: /\.svg$/,
				exclude: /node_modules/,
				use: SvgSpriteHtmlWebpackPlugin.getLoader()
			},
			{
				test: /\.(scss|sass|css)$/,
				exclude: /\node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: { publicPath: '../../' }
					},
					{ loader: 'css-loader' },
					{
						loader: 'postcss-loader',
						options: {
							plugins: [autoprefixer()]
						}
					},
					{ loader: 'sass-loader' }
				]
			},
			{
				test: /\.(jpeg|jpg|png|gif)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[hash].[ext]',
							outputPath: './assets/img',
							useRelativePath: true
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							// optipng.enabled: false will disable optipng
							optipng: {
								enabled: false
							},
							pngquant: {
								quality: [0.65, 0.9],
								speed: 4
							},
							gifsicle: {
								interlaced: false
							},
							webp: {
								quality: 75
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve('src', 'pages', 'index.pug')
		}),
		new SvgSpriteHtmlWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].[hash].css',
			chunkFilename: 'assets/css/[name].[hash].css'
		})
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				sourceMap: false,
				cache: true,
				parallel: true
			}),
			new OptimizeCSSAssetsPlugin()
		]
	}
};
