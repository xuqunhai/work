const path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  // 这里使用resolveLoader配置项，指定loader查找文件路径，这样我们使用loader时候可以直接指定loader的名字
  resolveLoader: {
    // loader路径查找顺序从左往右
    modules: ['node_modules', './']
  },
  module: {
    // loader本质上就是一个函数，这个函数会在我们在我们加载一些文件时执行
    // 同步loader
    // rules: [
    //   {
    //     test: /\.js$/,
    //     use: 'syncLoader'
    //   }
    // ]
    // 使用官方推荐的loader-utils包去完成更加复杂的loader的编写
    // 为我们的loader增加了options配置项，接下来在loader函数里使用loader-utils获取配置项内容，拼接内容
    // rules: [
    //   {
    //     test: /\.js$/,
    //     use: {
    //       loader: 'syncLoader2',
    //       options: {
    //         message: '升值加薪'
    //       }
    //     }
    //   }
    // ]

    // 异步loader
    // 执行顺序是从后往前，所以先异步再同步
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'syncLoader2',
            options: {
              message: '同步走上人生巅峰666'
            }
          },
          {
            loader: 'asyncLoader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext].webp'
            }
          },
          {
            loader: 'webp-loader',
            options: {
              quality: 70
            }
          }
        ]
      }
    ]
  }
};
