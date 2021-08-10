class RedisLock {
    /**
     * 初始化 RedisLock
     * @param {*} client 
     * @param {*} options 
     */
    constructor (client, options={}) {
        if (!client) {
            throw new Error('client 不存在');
        }

        if (client.status !== 'connecting') {
            throw new Error('client 未正常链接');
        }

        this.lockLeaseTime = options.lockLeaseTime || 2; // 默认锁过期时间 2 秒
        this.lockTimeout = options.lockTimeout || 5; // 默认锁超时时间 5 秒
        this.expiryMode = options.expiryMode || 'EX';
        this.setMode = options.setMode || 'NX';
        this.client = client;
    }
    
    /**
     * 上锁
     * @param {*} key 
     * @param {*} val 
     * @param {*} expire 
     */
    async lock(key, val, expire, v) {
        const start = Date.now();
        const self = this;

        return (async function intranetLock(newV = '') {
            try {
                if (newV) val = newV
                const result = await self.client.set(key, val, self.expiryMode, expire || self.lockLeaseTime, self.setMode);
        
                // 上锁成功
                if (result === 'OK') {
                    console.log(`${key} ${val} 上锁成功`);
                    return newV || val || true;
                }

                // 锁超时
                if (Math.floor((Date.now() - start) / 1000) > self.lockTimeout) {
                    console.log(`${key} ${val} 上锁重试超时结束`);
                    return false;
                }

                // 循环等待重试
                console.log(`${key} ${val} 等待重试`);
                await sleep();
                console.log(`${key} ${val} 开始重试`);
                newV = await getNewVal(key, v)
                
                return intranetLock(newV);
            } catch(err) {
                throw new Error(err);
            }
        })();
    }
    /**
     * 释放锁
     * @param {*} key 
     * @param {*} val 
     */
    async unLock(key, val) {
        const self = this;
        const script = "if redis.call('get',KEYS[1]) == ARGV[1] then" +
        "   return redis.call('del',KEYS[1]) " +
        "else" +
        "   return 0 " +
        "end";

        try {
            const result = await self.client.eval(script, 1, key, val);

            if (result === 1) {
                return true;
            }
            
            return false;
        } catch(err) {
            throw new Error(err);
        }
    }
}

const Redis = require("ioredis");
const redis = new Redis(6379, "127.0.0.1");
const redisLock = new RedisLock(redis);

function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(function() {
            resolve();
        }, time || 1000);
    });
}

async function test(key, val) {
    try {
        const newVal = await getNewVal(key, val)
        const newV = await redisLock.lock(key, newVal, 20, val);
        await sleep();
        
        const unLock = await redisLock.unLock(key, newV || newVal);
        console.log('unLock: ', key, newV || newVal, unLock);
    } catch (err) {
        console.log('上锁失败', err);
    }  
}

async function getNewVal(key, val) {
    let arr = await redisLock.client.get(key);
    console.log('get arr', arr)
    if (!val) {
        console.log('result: ', arr)
        return
    }
    if (!arr) arr = []
    if (typeof arr === 'string') arr = JSON.parse(arr)
    arr.push(val)
    return new Promise(resolve => {
        resolve(JSON.stringify(arr))
    })
}

test('arr', 1);
test('arr', 2);
test('arr', 3);
test('arr', 4);
test('arr', 5);
