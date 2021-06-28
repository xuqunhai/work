function say(who){
    console.log(`${who} speaking`)
}
Function.prototype.before = function(beforeFunc){
    // 箭头函数没有this、arguments和原型
    return (...args)=>{ // ...在函数参数时剩余运算符
        beforeFunc()
        this(...args) // ...在调用时叫展开
        // this.apply(void 0, args)
    }
}
const newFn = say.before(function(){
    console.log('before speaking')
})
newFn('James')

// 闭包 —— 作用域是函数定义时决定，函数调用时是执行上下文


function after(times, callback){ // 闭包 times
    return function(){
        if(--times===0){
            callback()
        }
    }
}
let fn = after(3, function(){
    console.log('really')
})
fn()
fn()
fn()