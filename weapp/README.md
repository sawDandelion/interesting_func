  
#### 项目介绍

创业就业小程序多端兼容项目

 是基于[React.js](http://react-china.org/) 、 [dvajs](https://dvajs.com/) 、[taro](https://nervjs.github.io/taro/docs/README.html) 、[taro-ui](https://taro-ui.aotu.io/)开发
  

#### 软件架构
master 为H5页面有构建打包2019.6.26日后不再维护
dev 为小程序分支持续维护中
  

软件架构说明

语法采用eslint控制

**src/index.js** 程序主入口

**src/assets** 资源文件存放

**src/components** 通用组件

**src/models** dva领域模型

**src/utils** 工具包






#### 安装教程

  

1. 安装 [nodejs](https://nodejs.org/en/)


2. `npm install --global create-react-app`

3. `npm install --global dva-cli`

4. 安装 [cnpm](http://npm.taobao.org/)
  

#### 使用说明

  

 `cnpm install` # 安装依赖(建议采用cnpm安装)

  

`npm run` # 启动运行
    `dev:weapp`:微信端
    `dev:swan`: 百度小程序
    `dev:alipay`: 支付宝小程序
    `dev:tt`: 字节跳动小程序
    `dev:h5`: h5页面
    `dev:rn`:  React Native
  

 `npm run ** ` # 生产环境打包
    `build:weapp`: 打包微信端
    `build:swan`: 百度小程序
    `build:alipay`:支付宝小程序
    `build:tt`: 字节跳动小程序
    `build:h5`: h5页面
    `build:rn`: React Native



