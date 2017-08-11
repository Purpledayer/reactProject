var pkg = require('./package.json');
var path = require('path')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		//打包./app/index.jsx里的所有业务代码
		app: path.resolve(__dirname, 'app/main.jsx'),
		// 将 第三方依赖 单独打包 打包线上依赖 --save命令安装的插件 在dependencies里
		vendor : Object.keys(pkg.dependencies),
	},
	output: {
		path: __dirname + "/build",
		filename: "[name].[chunkhash:8].js",//[chunkhash:8] MD5的时间戳
		publicPath: '/'
	},
	resolve:{
		extensions: ['.jsx','.js', '.json','.less'],
	},
    module: {
        loaders: [
			{ 
				test: /\.(js|jsx)$/, 
				exclude: /node_modules/,
				loader: 'babel-loader' ,
				options: {
          plugins: [
            ['import', { libraryName: 'antd', style: true }],
          ],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
        },
			},{ 
				test: /\.less$/, 
				exclude: /node_modules/, //ExtractTextPlugin.extract css 代码分离
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss!less-loader') 
			},{ 
				test: /\.css$/, 
				exclude: /node_modules/, 
				loader: ExtractTextPlugin.extract('style-loader', 'css!postcss') 
			},{ 
				test:/\.(png|gif|jpg|jpeg|bmp)$/i, 
				loader:'url-loader?limit=5000000000000&name=images/[name].[chunkhash:8].[ext]'
			},
			
            // ,{
            //     test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, 
            //     loader:'url-loader?limit=5000&name=fonts/[name].[chunkhash:8].[ext]'
            // }
        ]
	},
	plugins: [
		// webpack 内置的 banner-plugin 编写注释
		new webpack.BannerPlugin("aaaaa"),

		// html 模板插件
		new HtmlWebpackPlugin({
			template: __dirname + '/app/index.html'
		}),

		// 定义为生产环境，编译 React 时压缩到最小
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		}),
		//OccurrenceOrderPlugin
		// 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
		//webpack优化插件
		new webpack.optimize.OccurrenceOrderPlugin(),
		//代码压缩混淆
		new webpack.optimize.UglifyJsPlugin({
			compress: {
			//supresses warnings, usually from module minification
			warnings: false
			}
		}),
		
		// 分离CSS和JS文件
		new ExtractTextPlugin('[name].[chunkhash:8].css'), 
		
		// 提供公共代码
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: '[name].[chunkhash:8].js'
		}),

		// 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
		new webpack.DefinePlugin({
		__DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
		})
	]
}