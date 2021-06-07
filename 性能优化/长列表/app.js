app.use(async (ctx, next) => {
    if (ctx.url === '/api/getMock') {
        let list = []

        // 生成指定个数的随机字符串
        function genrateRandomWords(n) {
            let words = 'abcdefghijklmnopqrstuvwxyz你是好的嗯气短前端后端设计产品网但考虑到付款啦分手快乐的分类开发商的李开复封疆大吏师德师风吉林省附近',
                len = words.length,
                ret = ''
            for (let i = 0; i < n; i++) {
                ret += words[Math.floor(Math.random() * len)]
            }
            return ret
        }

        // 生成10万条数据的list
        for (let i = 0; i < 100000; i++) {
            list.push({
                name: `xu_0${i}`,
                title: genrateRandomWords(12),
                text: `我是第${i}项目, 赶快?吧~~`,
                tid: `xx_${i}`
            })
        }

        ctx.body = {
            state: 200,
            data: list
        }
    }
    await next()
})