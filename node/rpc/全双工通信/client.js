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
const lessonIds = [1,2,3,4]
let index=Math.floor(Math.random()*lessonIds.length)


socket.on('data', function (buffer) {
    const seqBuffer=buffer.slice(0,2)
    const titleBuffer=buffer.slice(2)
    console.log(seqBuffer.readInt16BE(), titleBuffer.toString())
    index=Math.floor(Math.random()*lessonIds.length)
    socket.write(encode(index))
})
let seq=0
function encode(index){
    buffer=Buffer.alloc(6)
    buffer.writeInt16BE(seq)
    buffer.writeInt32BE(lessonIds[index], 2)
    console.log(seq, lessonIds[index])
    seq++
    return buffer
}

setInterval(() => {
    index=Math.floor(Math.random()*lessonIds.length)
    socket.write(encode(index))
}, 50);