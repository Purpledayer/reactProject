const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
// const casProxy = require('./proxy');

	module.exports = {
	entry: {
		js: './app/main.jsx',
		vendor: [
		'react', 'classnames', 'react-router', 'react-dom',
		],
	},
	output: {
		// path: path.resolve(__dirname, 'dist'),
		// filename: './vendor.js',
		filename: '[name].js',
		path: path.join(__dirname, 'dist'),
		chunkFilename: '[name].js'
	},
	resolve: {//查找后缀名自动补全
		//webpack 2.X.X 写法
		//  extensions: ['','.jsx', '.js', '.json'],
		//webpack 3.X.X 写法
		extensions: ['.jsx','.js', '.json','.less'],
		alias: {
		components: __dirname + '/app/components',
		actions: __dirname + '/app/actions',
		api: __dirname + '/app/api',
		reducers: __dirname + '/app/reducers',
		utils: __dirname + '/app/utils',
		constants: __dirname + '/app/constants',
		controllers: __dirname + '/app/controllers',
		style: __dirname + '/app/style',
		},
	},
	module: {
		loaders: [
			{
				test: /\.js[x]?$/,
				exclude: /node_modules/,
				loader: 'react-hot-loader!babel-loader',
				options: {
					plugins: [
						['import', { libraryName: 'antd', style: true }],
					],
					// This is a feature of `babel-loader` for webpack (not Babel itself).
					// It enables caching results in ./node_modules/.cache/babel-loader/
					// directory for faster rebuilds.
					cacheDirectory: true,
				}
			},{
				test: /\.less$/,
				exclude: /node_modules/,
				loader: 'style-loader!css-loader!less-loader',
			},{
				test: /\.css/,
				exclude: /node_modules/,
				loader: 'style!css',
			},{
				test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=5000',//限制图片大小5kb
			}, 
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": { 
				NODE_ENV: JSON.stringify("production") 
			}
		}),
		//webpack 2.X.X 写法
		// new webpack.optimize.OccurenceOrderPlugin(),
		//webpack 3.X.X 写法
		new webpack.optimize.OccurrenceOrderPlugin(),

		//webpack 2.X.X 写法
		//  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
		//webpack 3.X.X 写法
		new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
		//html 模板插件
		new HtmlWebpackPlugin({
		template: path.join(__dirname, 'app/index.html'),
		}),
		//打开浏览器
		new OpenBrowserPlugin({
			url: 'http://localhost:3000'
		}),
	],
	devtool: 'source-map',
	devServer: {
		contentBase: './app/',//本地服务器所加载的页面所在的目录
		historyApiFallback: true,//不跳转
		inline: true, //实时刷新
		hot: true,// 使用热加载插件 HotModuleReplacementPlugin
		// colors: true, //终端中输出结果为彩色
		proxy: {
			// 凡是 `/wbp` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
			// koa 代码在 ./mock 目录中，启动命令为 npm run mock
			'/wbp': {
				target: 'http://localhost:3001/',
				secure: false
			}
		},
	},
}
//少了HotModuleReplacementPlugin&&  __DEV__