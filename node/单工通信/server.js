/*
 * @Author: your name
 * @Date: 2021-04-10 21:40:31
 * @LastEditTime: 2021-04-10 21:43:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /work/work/node/单工通信/server.js
 */
const net = require('net');
const server = net.createServer(socket => {
    socket.on('data', function (buffer) {
        console.log(buffer, buffer.toString());
        // <Buffer 67 6f 6f 64 20 6d 6f 72 6e 69 6e 67 20 67 65 65 6b 62 61 6e 67> good morning geekbang
    });
});
server.listen(4000);
