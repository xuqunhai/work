var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/)

/*
var expression = '';
var rs = expression.match(/(.*) (?:in|of) (.*)/)
console.log(rs)
VM168:3 null

var expression = 'a in b';
var rs = expression.match(/(.*) (?:in|of) (.*)/)
console.log(rs)
VM180:3 (3) ["a in b", "a", "b", index: 0, input: "a in b", groups: undefined]
*/

if (inMatch) {
    var itMatch = inMatch[1].match(/\((.*),(.*)\)/)
    /*
    var expression = 'a,b';
    var rs = expression.match(/\((.*),(.*)\)/)
    console.log(rs)
    VM199:3 null

    var expression = '(a, b)';
    var rs = expression.match(/\((.*),(.*)\)/)
    console.log(rs)
    VM209:3 (3) ["(a, b)", "a", " b", index: 0, input: "(a, b)", groups: undefined]
    */
   if (itMatch) {
    this.iterator = inMatch[1].trim()
    this.alias = inMatch[2].trim()
   } else {
    this.alias = inMatch[1].trim()
   }
   if (!this.alias) {
    process.env.NODE_ENV !== 'production' && warn('Invalid v-for expression: alias is required')
   }
   return
}

// 之前，v-for="number in 10" 的 number 从 0 开始到 9 结束，现在从 1 开始，到 10 结束。

