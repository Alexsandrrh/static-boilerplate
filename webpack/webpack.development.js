const path = require('path');
const autoprefixer = require('autoprefixer');
const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.pug/,
				exclude: /(node_modules|bower_components)/,
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
				test: /\.(jpeg|jpg|png|gif)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[hash].[ext]',
							outputPath: './assets/images',
							useRelativePath: true
						}
					}
				]
			},
			{
				test: /\.(scss|sass|css)$/,
				exclude: /\node_modules/,
				use: [
					{
						loader: 'style-loader'
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
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve('src', 'pages', 'index.pug')
		}),
		new SvgSpriteHtmlWebpackPlugin()
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		publicPath: '/',
		hot: true,
		port: 3535
	}
};
