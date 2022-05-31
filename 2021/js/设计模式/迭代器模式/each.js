function each(data) {
  let iterator = data[Symbol.iterator]();
  let item = { done: false };
  while (!item.done) {
    item = iterator.next();
    if (!item.done) console.log(item.value);
  }
}

// for...of就是上面简写
function each2(data) {
  for (let item of data) {
    console.log(item);
  }
}
