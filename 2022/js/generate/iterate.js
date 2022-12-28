function createInterate(arr) {
  let i = 0
  return {
    next: function () {
      const done = i >= arr.length
      const value = done ? undefined : arr[i++]
      return {
        value,
        done
      }
    }
  }
}

const iterate = createInterate([1, 2, 3])
console.log(iterate.next())
console.log(iterate.next())
console.log(iterate.next())
console.log(iterate.next())
console.log(iterate.next())

function* generate1() {
  yield 1
  yield 2
  yield 3
}
const iterate1 = generate1()
console.log(iterate1.next())
console.log(iterate1.next())
console.log(iterate1.next())
console.log(iterate1.next())
console.log(iterate1.next())

console.log('-----------------------')

function* generate2() {
  let first = yield 1
  console.log('first', first)
  let second = yield first + 2
  console.log('second', second)
  yield second + 3
}
const iterate2 = generate2()
console.log(iterate2.next())
console.log(iterate2.next(22))
console.log(iterate2.next(33))
