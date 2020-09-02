const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const packageData = require('./package.json');

module.exports = [
	{
		mode: 'production',
		name: 'transitionAuto',
		entry: './src/index.js',
		target: 'web',
		output: {
			library: 'transitionAuto',
			libraryTarget: 'var',
			filename: 'transition-auto.js',
			path: path.resolve(__dirname, './dist')
		},
		plugins: [
			new webpack.BannerPlugin({
				banner: `transition-auto v${packageData.version}\nhttps://github.com/alexspirgel/transition-auto`
			})
		],
		optimization: {
			minimize: false
		},
		watch: true
	},
	{
		mode: 'production',
		name: 'transitionAuto',
		entry: './src/index.js',
		target: 'web',
		output: {
			library: 'transitionAuto',
			libraryTarget: 'var',
			filename: 'transition-auto.min.js',
			path: path.resolve(__dirname, './dist')
		},
		plugins: [
			new webpack.BannerPlugin({
				banner: `transition-auto v${packageData.version}\nhttps://github.com/alexspirgel/transition-auto`
			})
		],
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					extractComments: false,
					terserOptions: {
						keep_classnames: true
					}
				})
			]
		},
		watch: true
	}
];