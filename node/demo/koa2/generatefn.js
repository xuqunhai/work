function* makeGenerate(arr) {
    for (let i = 0; i < arr.length; i++) {
        yield arr[i];
    }
}
const gen = makeGenerate([1, 2, 3]);
console.log(1, gen.next());
console.log(2, gen.next());
console.log(3, gen.next());
console.log(4, gen.next());

function myGenerate(arr) {
    let index = 0;
    return {
        next: function () {
            if (index < arr.length) {
                return { value: arr[index++], done: false };
            } else {
                return { value: undefined, done: true };
            }
        },
    };
}
const mygen = myGenerate([1, 2, 3]);
console.log(1, mygen.next());
console.log(2, mygen.next());
console.log(3, mygen.next());
console.log(4, mygen.next());
