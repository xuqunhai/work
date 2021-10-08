;[
    'push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'
].forEach(function(method) {
    var original = arrayProto[method]
    def(arrayMethods, method, function mutator() {
        var i = arguments.length
        var args = new Array(i)
        while (i--) {
            args[i] = arguments[i]
        }
        var result = original.apply(this, args)
        var ob = this.__ob__
        var inserted
        switch (method) {
            case 'push':
                inserted = args
                break
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2)
                break
        }
        if (inserted) ob.observeArray(inserted)
        ob.dep.notify()
        return result
    })
})


def(arrayProto, '$set', function $set(index, val) {
    if (index >= this.length) {
        this.length = Number(index) + 1
    }
    return this.splice(index, 1, val)[0]
})

def(arrayProto, '$remove', function $remove(item) {
    if(!this.length) return
    var index = indexOf(this, item)
    if (index > -1) {
        return this.splice(index, 1)
    }
})
// 删除元素方法: items.$remove(item)