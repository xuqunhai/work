const DEFAULT_OPTIONS = {
    prefix: /preload-/g,
    as: "image",
    rel:"preload"
}

class SimplePreloadWebpackPlugin {
    constructor(options) {
        this.options = {
            ...DEFAULT_OPTIONS,
            ...options,
        }
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync("SimplePreloadWebpackPlugin", (compilation, callback) => {

            let key = Object.keys(compilation.assets).filter(key => /\.html/.test(key))[0]
            let html = compilation.assets[key].source()
            let index = this.findTargetIndex(html)

            let leftHtml = html.slice(0, index)
            let rightHtml = html.slice(index)

            let preloadAssets = Object
                .keys(compilation.assets)
                .filter(assetPath => this.options.prefix.test(assetPath))
                .map(assetPath => `<link href=${assetPath} rel=${this.options.rel} as=${this.options.as}>`)

            compilation.assets[key] = {
                ...compilation.assets[key],
                source() {
                    return leftHtml + preloadAssets.toString() + rightHtml
                },
                size() {
                    return (leftHtml + preloadAssets.toString() + rightHtml).length
                }
            }
            callback()
        })
    }
    findTargetIndex(html) {
        let regExp = /<link[^>]*>/g
        let index = 0
        do {
            index = regExp.lastIndex
            regExp.exec(html)
        } while (regExp.lastIndex)


        if(!index){
            index = html.indexOf('</head>')
            if(index < 0 ) throw new Error("can not find node 'head'")
        }
        return index
    }
}

module.exports = SimplePreloadWebpackPlugin