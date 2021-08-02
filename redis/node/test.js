const Redis = require('ioredis')
const redis = new Redis()
for(let i=0;i<1500;i++){
    const count = redis.get('b') - 1
    redis.set('b', count)
}

setTimeout(() => {
    redis.get('b').then((val) => {
        console.log('val1', val)
    })
}, 10000)