const Redis = require('ioredis')
const redis = new Redis()

redis.set('foo', 'bar', () => {
    // redis.get('foo', (err, val) => {
    //     console.log('val', val)
    // })
    redis.get('foo').then((val) => {
        console.log('val1', val)
    })
})

redis.get('home', (err, home) => {
    redis.hget('locations', home, (err, address) => {
        redis.exists('address: '+address, (err, addressExists) => {
            if (addressExists) {
                console.log('地址存在')
            } else {
                redis.exists('backup.address:'+address, (err,backupAddressExists) => {
                    if (backupAddressExists) {
                        console.log('备用地址存在');
                    }
                })
            }
        })
    })
})

async.waterfall([
    function(cb) {
        redis.get('home', cb)
    },
    function(home,cb) {
        redis.hget('locations', home, cb)
    },
    function(address,callback) {
        async.parallel([
            function(cb) {
                redis.exists('address:'+address,cb)
            },
            function(cb) {
                redis.exists('backup.address:'+address,cb)
            }
        ], function(err,results){
            if(results[0]){
                console.log('地址存在')
            }else if(results[1]){
                console.log('备用地址存在');
            }else{

            }
        })
    }
])