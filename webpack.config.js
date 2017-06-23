//遵循 commonJs 的规范
const path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry:path.join(__dirname,'src/main.js'),
    output:{
        //path:__dirname, //路径写全了,不用写path.但是报错了,还是这样写
        //filename:path.join(__dirname,'dist/bundle.js')
        //filename:'dist/bundle.js'
        //使用插件后新的写法
        //path:'/dist',//这里要写绝对路径,不然不错,也可以这样写
        path:path.join(__dirname,'dist'),//当前文件夹下的dist文件夹
        filename:'bundle.js'
    },
    module :{
        loaders:[
            {
                test:/\.vue$/,
                loader:'vue-loader'//装了三个,只要写这一个,因为有相互依赖
            },
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'//order cant not change
            },
            {
                //test:/\.(ttf|png|jpg|gif|svg)$/,
                test:/\.(png|ttf|gif|svg)$/,
                loader:'url-loader?limit=4000' // when pickture size less than 4k, use 'base-64' express
            },
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins :[new HtmlWebpackPlugin({//实例化插件,生成index.html ,bundle.js
        //'webpack-dev-server --progress --open --port 3008',user this common to watch the changed file, and open new page .
        // but this command is to long ,so  can config this command in packckage.json at script . last input :'npm run dev'. dev is the key of this command.
        filename:'index.html',//The file to write the HTML to. Defaults to index.html. You can specify a subdirectory here too (eg: assets/admin.html).
        template:'template.html' //Load a custom template;Webpack require path to the template.
    }),
        //这个插件帮我们做了两件事，es6转es5,再压缩
        // 压缩js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false //去掉版权信息等注释
        }),
        // 代码顺序优化
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
}