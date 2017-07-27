## 插件&插件说明
### 上线依赖插件说明
```
react                                   //react.js  
react-router                            //react.js路由  
react-dom                               //react.js dom操作  
antd                                    //蚂蚁金服ant design 插件  
webpack                                 //webpack插件  
html-webpack-plugin                     //用来简化创建服务于 webpack bundle 的 HTML 文件  
open-browser-webpack-plugin             //启动后自动打开浏览器插件  
extract-text-webpack-plugin             //抽离css 防止打不错乱
```
### 开发依赖插件说明
```
webpack-dev-server                      //webpack服务插件  
babel-loader                            //webpack-loader基础插件  
css-loader                              //css编译插件  
less-loader                             //less编译插件  
style-loader  
url-loader  
react-hot-loader                        //react.js 热刷新  
webpack-hot-middleware                  //自动刷新  
babel-plugin-webpack-alias              //功能未知  
```
### 插件安装
#### 上线之后一直依赖
```
cnpm install react react-router react-dom antd webpack html-webpack-plugin open-browser-webpack-plugin extract-text-webpack-plugin --save
```
#### 开发依赖
```
cnpm install webpack-dev-server babel babel-cli babel-core babel-loader css-loader less-loader style-loader url-loader react-hot-loader webpack-hot-middleware --save-dev
```
```
npm i webpack-dev-server babel-loader css-loader less-loader style-loader react-hot-loader webpack-hot-middleware --save-dev    
```
babel

babel-plugin-antd  
babel-plugin-espower  
babel-plugin-transform-runtime  
babel-plugin-transform-decorators-legacy  
babel-plugin-webpack-alias  
babel-preset-es2015  
babel-preset-stage-0  
babel-preset-react

npm i redux react-redux redux-thunk react-router-redux   --save

cnpm i react-router-dom --save
cnpm i url-loader --save-dev
cnpm i file-loader --save-dev
cnpm install victory --save 可视化图表