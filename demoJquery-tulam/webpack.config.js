var path = require('path');
//var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {//Đầu vào: Muốn đóng gói file nào thì truyền dir vô đây
        //Tên đại diện : 'Đường dẫn đến file'
        bundle: './js/demoWP1.js'
    },

    //Đầu ra : Sau khi đóng gói thì nằm chỗ nào 
    output: {
        //Ở cùng cấp với webpack.config.js, tạo ra 1 folder dist để chứa file đóng dói
        path: path.resolve(__dirname,'dist'),
        //Tên file được đóng gói
        //Bên trong Dist , tạo ra một cái filder js, trong f js sẽ có file bundle.js
        filename:'js/[name].js'
    },
    //devtool: 'source-map',
    
    module: {
        rules: [
            {
                //kiểm tra nếu trong file đóng gói có css
                test: /\.css$/,
                //Sử dụng 2 loader là css-loader và style-loader
                use: ['style-loader', 'css-loader']
            },
            // {
            //     test:/\.ts$/,
            //     use:['ts-loader']
            // }, 
            {
                test: /\.scss$/,
                loader: ['style-loader','css-loader', 'sass-loader']
            },
            // {
            //     test:/\.html$/,
            //     use:['html-loader']
            // },
            {
                test: /\.(png|jpg|svg|JPG)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        limit: 100, //dung lượng hình file  
                        name: '[name].[ext]',
                        outputPath: "img/",
                        publicPath: "img/",
                        // limit: 2000000,
                    }
                }]
            }
        ]
    },/*
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/app/Views/index.html',
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            filename:'signin.html',
            template:'./src/app/Views/signin.html',
            chunks:['signin']
        }),
    ],
*/
}