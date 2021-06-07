/*
 * @Author: your name
 * @Date: 2021-04-10 21:39:32
 * @LastEditTime: 2021-04-10 21:40:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /work/work/node/单工通信/client.js
 */
const net = require('net');
const socket = new net.Socket({});
socket.connect({
    host: '127.0.0.1',
    port: 4000,
});

socket.write('good morning geekbang');
