
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const webpack = require("webpack")
const pxtorem = require('postcss-pxtorem')
module.exports = {
    chainWebpack: config => {
        // 设置快捷路径， @ 表示 'src' ，components 表示 'src/components'
        config.resolve.alias
            // .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'))
            .set('home', resolve('src/views/home'))
            .set('common', resolve('src/components/common'))
            .set('network', resolve('src/network'))
    },
    devServer: {
        port: 8080, // 此处修改你想要的端口号，
        disableHostCheck: true
    },
    assetsDir: "src/assets",
    // 配置插件参数
	configureWebpack: {
		plugins: [
			// 配置 jQuery 插件的参数
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery',
				Popper: ['popper.js', 'default']
			})
		]
    },
    // css: {
    //     loaderOptions: {
    //       postcss: {
    //         plugins: [
    //           pxtorem({
    //             rootValue: 37.5,
    //             propList: ['*'],
    //             // 该项仅在使用 Circle 组件时需要
    //             // 原因参见 https://github.com/youzan/vant/issues/1948
    //             selectorBlackList: ['van-circle__layer']
    //           })
    //         ]
    //       }
    //     }
    //   }
}
