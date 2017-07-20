const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
	//webpack入口文件
	entry: {
	    js: './app/main.jsx',
	    //描述
	    vendor: [
	      'react', 'classnames', 'react-router', 'react-dom',
	    ],
  	},
  	//输出文件位置
	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'dist'),
		chunkFilename: '[name].js'
	},
	resolve: {
		extensions: ['.jsx','.js', '.json','.less'],
		alias: {
		  	components: __dirname + '/app/components',
		  	pages: __dirname + '/app/pages',
		},
	},
	//webpack-loader配置
	module: {
	    loaders: [{
	        test: /\.js[x]?$/,
	        exclude: /node_modules/,
	        loader: 'react-hot-loader!babel-loader',
	      },{
	        test: /\.less$/,
	        loader: 'style-loader!css-loader!less-loader',
	      },{
            test: /\.css$/,
            use: ['style-loader',
                {loader: 'css-loader',options: {importLoaders: 1}},
                {loader: 'postcss-loader',
                options: {plugins: (loader) => [
                    require('postcss-import')({root: loader.resourcePath}),
                    require('autoprefixer')(), //CSS浏览器兼容
                    require('cssnano')()  //压缩css
                    ]}
                }
            ]
        },{
	        test: /\.(png|jpg)$/,
	        loader: 'url-loader?limit=8192',
	      }],
	  	},
	 
	//外部插件设置
	plugins: [
		new webpack.DefinePlugin({"process.env": {NODE_ENV: JSON.stringify("production")}}),
    	new webpack.optimize.OccurrenceOrderPlugin(),
    	new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    	// new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
	    /*压缩优化代码开始  可以关掉*/
	    // new webpack.optimize.UglifyJsPlugin({minimize: true}),
	    /*压缩优化代码结束*/
    	new HtmlWebpackPlugin({
      		template: path.join(__dirname, './app/index.html'),
    	}),
   		new OpenBrowserPlugin({
      		url: 'http://localhost:3000'
    	}),
  	],
};