function* createNumberIterator() {
  yield 1
  yield 2
  return 3
}

function* createRepeatingIterator(count) {
  for (let i = 0; i < count; i++) {
    yield 'repeat'
  }
}

function* createCombinedIterator() {
  let result = yield* createNumberIterator()
  yield* createRepeatingIterator(result)
}

var iterator = createCombinedIterator()

console.log(iterator.next()) // "{ value: 1, done: false }"
console.log(iterator.next()) // "{ value: 2, done: false }"
console.log(iterator.next()) // "{ value: "repeat", done: false }"
console.log(iterator.next()) // "{ value: "repeat", done: false }"
console.log(iterator.next()) // "{ value: "repeat", done: false }"
console.log(iterator.next()) // "{ value: undefined, done: true }"
