/*
 * @Author: your name
 * @Date: 2021-04-10 21:40:31
 * @LastEditTime: 2021-04-10 21:43:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /work/work/node/单工通信/server.js
 */
const net = require('net');
const data={
    0: 'this is zero',
    1: 'this is first',
    2: 'this is second',
    3: 'this is third',
    4: 'this is fourth'
}
const server = net.createServer(socket => {
    socket.on('data', function (buffer) {
        const lessonId=buffer.readInt32BE()
        console.log('lessonId', lessonId)
        setTimeout(() => {
            socket.write(Buffer.from(data[lessonId]))
        }, 500)
    });
});
server.listen(4000);
