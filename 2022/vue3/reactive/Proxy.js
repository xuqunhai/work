// Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。
// Proxy也是存在代理局限性的，因为你操作源对象时，捕获器并不会被触发

// 代理对象=new Proxy（愿对象，处理对象）
const origin = {}
const handler = {} // 处理对象则是由一系列捕获器所构成的对象。
const proxy = new Proxy(origin, handler) // 缺少任何一个参数则抛出TypeError错误

// 另外一个要注意的点就是Proxy.prototype为undefined
console.log('Proxy.prototype：', Proxy.prototype) // undefined

/*
处理对象 handler 有get、set、has、deleteProperty等,
如果处理对象为空，那就相当于没有设置任何捕获行为

get
当通过[]、.、Object.create等操作对代理对象中的属性进行访问时，如 console.log(proxy.name)
都会触发get捕获器，同时该捕获器会接收到三个参数
源对象 / 本次访问的属性 / 代理对象
get(origin, property, proxy) {

get的限制
当源对象上拥有一个不可写且不可配置的属性时，get返回的值始终要与该属性的值保持一致，否则会抛出TypeError
const origin = {}
Object.defineProperty(origin, 'name', {
    value: '鲨鱼辣椒',
    writable: false,
    configurable: false,
})
const handler = {
    get() {
        // 此处应当返回'鲨鱼辣椒'
        return '蜘蛛侦探'
    }
}
const proxy = new Proxy(origin, handler)
console.log(proxy.name) // TypeError

set
在修改对象的属性值时被触发，接收四个参数
要修改属性的对象 / 要修改的属性 / 新的属性值 / 代理对象
如果源对象中的某个属性不可写且不可配置，那么set捕获器也就不得改变它的值，只能返回相同的值，否则也会抛出TypeError
  set(origin, property, value, proxy) {
    console.log(`${property}被修改了`)
    origin[property] = value
  }

has
捕获器会在通过in检查一个对象中是否包含某个属性时触发。会收到两个参数
要检查的对象
要检查的属性
需要注意的是，虽然for...in也用到了in操作符，但has却不会捕获for...in的操作
const origin = { name: '鲨鱼辣椒' }
const handler = {
    has() {
        console.log('has被触发了') // 只会输出一次
    }
}
const proxy = new Proxy(origin, handler)
name in proxy // 触发has捕获器
for (const name in proxy) { } //  // 不会触发has捕获器

对源对象创建多层代理
const firstProxy = new Proxy(origin, handler('你正在访问第一层代理'))
const secondProxy = new Proxy(firstProxy, handler('你正在访问第二层代理'))

反向代理
const origin = {
    sayName(name) {
        return name
    }
}
const handler = {
    get(origin, property, proxy) {
        return effect
    }
}
const effect = function (name) {
    // do Something
    return name
}
const proxy = new Proxy({}, handler)
// 使Proxy的实例作为其它对象的原型对象
origin.__proto__ = proxy
console.log(origin.sayName('鲨鱼辣椒')) // 鲨鱼辣椒，调用sayName时，发现origin本身就有，所以直接调用；
console.log(origin.sayAge(25)) // 25
// 调用sayAge时，发现origin本身没有，于是顺着原型链查找，而origin.__proto__是proxy，于是相当于访问proxy.sayAge，
// 随后触发get捕获器，返回effect函数，并且传参为25，所以便输出25

撤销代理
撤销代理对象与源对象之前的关联，此时Proxy.revocable就派上用场了，
该方法会返回一个对象，返回的这个对象中包含代理对象proxy与撤销函数revoke
const { proxy, revoke } = Proxy.revocable(origin, handler)
revoke无论调用多少次，其结果总是相同，
但如果在调用之后还试图访问代理对象中的属性，则会抛出TypeError。撤销代理之后不会对源对象造成任何负面影响
// 撤销代理
revoke()
console.log(origin.name) // 鲨鱼辣椒
console.log(proxy.name) // TypeError(触发了捕获器，所以返回TypeError)

应用场景是，假设你有一个很重要的global对象，里面存储了各式各样的API，现在你只想把这个对象暴露出去，
那每位用户便都拥有了访问和自定义global对象内容的权力，但如果你只想让用户访问，而不给予它们修改的权力，此时你便可以使用撤销代理了，
当global被替换或者里面的数据发生改变时，我们就可以撤销代理，
当用户再次访问或试图修改数据时会抛出一个TypeError，用户就可以根据当前错误来清楚的知道我们的本意并做出相应的操作

隐藏属性
const origin = { name: '鲨鱼辣椒', age: 25 }
const handler = {
    get(origin, property) {
        return property === 'age' ? undefined : origin[property]
    }
}
const proxy = new Proxy(origin, handler)
console.log(proxy.age) // undefined

代理存在的问题
在源对象中是否依赖于this作为标识
const origin = {
    name: '鲨鱼辣椒',
    say() {
        // 两次的this并不相同
        return this
    }
}
const handler = {}
const proxy = new Proxy(origin, handler)
console.log(origin.say()) // {name: '鲨鱼辣椒', say: ƒ}
console.log(proxy.say()) // Proxy {name: '鲨鱼辣椒', say: ƒ}

还有一个特殊的例子就是Date类型了。
根据ECMAScript规范，Date类型方法的执行依赖于this上的内部槽位[[ NumberDate ]]，
但代理对象毫无疑问是不存在这个槽位的，所以在使用代理对象访问Date类上的方法时会抛出TypeError
const origin = new Date()
const handler = {}
const proxy = new Proxy(origin, handler)
console.log(proxy.getDate()) // TypeError
*/