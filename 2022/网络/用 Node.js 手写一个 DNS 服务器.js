/*
https://juejin.cn/post/7105620424368586782

修改系统偏好设置的本地 DNS 服务器地址指向本机：
127.0.0.1

xuqunhai@xuqunhaideMacBook-Pro work % nslookup
> baidu.com
Server:         8.8.8.8
Address:        8.8.8.8#53

Non-authoritative answer:
Name:   baidu.com
Address: 110.242.68.66
Name:   baidu.com
Address: 39.156.66.10
> xuqunhai.666.com
Server:         8.8.8.8
Address:        8.8.8.8#53

** server can't find xuqunhai.666.com: NXDOMAIN
> guangguangguang.ddd.com
Server:         127.0.0.1
Address:        127.0.0.1#53

Non-authoritative answer:
Name:   guangguangguang.ddd.com
Address: 11.22.33.44
> 
*/

const dgram = require('dgram')

const server = dgram.createSocket('udp4')

function parseHost(msg) {
    let num = msg.readUInt8(0);
    let offset = 1;
    let host = "";
    while (num !== 0) {
      host += msg.subarray(offset, offset + num).toString();
      offset += num;
  
      num = msg.readUInt8(offset);
      offset += 1;
  
      if (num !== 0) {
        host += '.'
      }
    }
    return host
}

function copyBuffer(src, offset, dst) {
    for (let i = 0; i < src.length; ++i) {
      dst.writeUInt8(src.readUInt8(i), offset + i)
    }
  }

function resolve(msg, rinfo) {
  
    const queryInfo = msg.subarray(12)
    const response = Buffer.alloc(28 + queryInfo.length)
    
    let offset = 0

    const id  = msg.subarray(0, 2)
    
    console.log('queryInfo', queryInfo)
    console.log('response', response)
    console.log('id', id)
    /*
    queryInfo <Buffer 0f 67 75 61 6e 67 67 75 61 6e 67 67 75 61 6e 67 03 63 6f 6d 00 00 01 00 01>
    response <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... 3 more bytes>
    id <Buffer 2c ac>
    */
    copyBuffer(id, 0, response)  
    offset += id.length
    
    // Flags
    response.writeUInt16BE(0x8180, offset)  
    offset += 2

    // Questions
    response.writeUInt16BE(1, offset)  
    offset += 2

    // Answer RRs
    response.writeUInt16BE(1, offset)  
    offset += 2

    // Authority RRs & Additional RRs
    response.writeUInt32BE(0, offset)  
    offset += 4
    copyBuffer(queryInfo, offset, response)
    offset += queryInfo.length

     // offset to domain name
    response.writeUInt16BE(0xC00C, offset) 
    offset += 2
    const typeAndClass = msg.subarray(msg.length - 4)
    copyBuffer(typeAndClass, offset, response)
    offset += typeAndClass.length

    // TTL, in seconds
    response.writeUInt32BE(600, offset)  
    offset += 4

    // Length of IP
    response.writeUInt16BE(4, offset)  
    offset += 2
    '11.22.33.44'.split('.').forEach(value => {
      response.writeUInt8(parseInt(value), offset)
      offset += 1
    })
    console.log('send response', response)
    /*
    send response <Buffer 2c ac 81 80 00 01 00 01 00 00 00 00 0f 67 75 61 6e 67 67 75 61 6e 67 67 75 61 6e 67 03 63 6f 6d 00 00 01 00 01 c0 0c 00 01 00 01 00 00 02 58 00 04 0b ... 3 more bytes>
    */
    server.send(response, rinfo.port, rinfo.address, (err) => {
      if (err) {
        console.log(err)
        server.close()
      }
    })
}

function forward(msg, rinfo) {
    const client = dgram.createSocket('udp4')
    client.on('error', (err) => {
      console.log(`client error:\n${err.stack}`)
      client.close()
    })
    client.on('message', (fbMsg, fbRinfo) => {
      server.send(fbMsg, rinfo.port, rinfo.address, (err) => {
        err && console.log(err)
      })
      client.close()
    })
    client.send(msg, 53, '192.168.199.1', (err) => {
      if (err) {
        console.log(err)
        client.close()
      }
    })
}

server.on('message', (msg, rinfo) => {
  const host = parseHost(msg.subarray(12))
  // console.log(`query: ${host}`);
  // console.log('server.on message')
  // console.log('msg', msg)
  // console.log('rinfo', rinfo)
  /*
  server.on message
  msg <Buffer 92 35 01 00 00 01 00 00 00 00 00 00 05 63 6d 63 6f 73 09 61 6c 62 61 74 72 6f 73 73 05 31 30 30 38 36 02 63 6e 00 00 41 00 01>
  rinfo { address: '127.0.0.1', family: 'IPv4', port: 52458, size: 42 }
  query: cmcos.albatross.10086.cn
  */
    if (/guangguangguang/.test(host)) {
        resolve(msg, rinfo)
    } else {
        forward(msg, rinfo)
    }
});
  
server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`)
    server.close()
})
  
server.on('listening', () => {
    const address = server.address()
    console.log(`server listening ${address.address}:${address.port}!!!`)
})
  
server.bind(53)