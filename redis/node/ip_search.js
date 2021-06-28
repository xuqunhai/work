const fs = require('fs')
const csv = require('csv')

const Redis = require('ioredis')
const redis = new Redis()

const readline=require("readline")
const r1=readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let csv_str="上海,202.127.0.0,202.127.4.255\n北京,122.200.64.0,122.207.255.255"
csv.parse(csv_str,{
    // delimiter: ','
  }, function(err, records) {
    console.log('records',records)
    records.forEach((record)=>{
        importIP(record)
    })
    r1.setPrompt('IP> ')
    r1.prompt()

    r1.on('line', line=>{
        ip=convertIPtoNumber(line)
        console.log('convertIPtoNumber ip',ip)
        redis.zrangebyscore('ip',ip,'+inf','LIMIT','0','1',(err, result)=>{
            console.log('zrangebyscore',result)
            if(!Array.isArray(result) || result.length === 0){
                console.log("No data")
            }else{
                const location=result[0]
                if(location[0]==='*'){
                    console.log('No data.')
                }else{
                    console.log(location)
                }
            } 
            r1.prompt()
        })
    })
})

function importIP(data){
    const location = data[0]
    const minIP = convertIPtoNumber(data[1])
    const maxIP = convertIPtoNumber(data[2])
    console.log('minIP',minIP,'maxIP',maxIP)
    redis.zadd('ip',minIP,'*'+location,maxIP,location)
}

function convertIPtoNumber(ip){
    let result = ''
    ip.split('.').forEach(item => {
        item = ~~item;
        item = item.toString(2)
        item = pad(item, 8)
        result += item;
    })
    return parseInt(result, 2)
}

function pad(num, n){
    let len=num.length;
    while(len<n){
        num='0'+num;
        len++;
    }
    return num;
}