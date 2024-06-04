// web_socket_server 

const http = require("http") //客户端与服务器第一次连接协议 获取页面
const web_socket = require("ws") //后续转发协议
const express = require("express") //中间件，发送初始页面
const fs = require("fs") //读取文件

//配置信息

const server = http.createServer()
const wss = new web_socket.Server({server})

const app = express()
app.get("/",(req,res)=>{
    let dir = process.cwd()
    res.sendFile(dir+"/pages/client_main.html")
})
server.on("request",app)

//伙伴信息
function createID(){
    return Math.random().toString(16).substring(2,6)
}
let people = {}

//绑定事件和行为
wss.on("connection",(ws)=>{
    let id = createID()
    console.log(' 新的连接建立,id分配为: '+id)
    for(old_id in people){
        people[old_id].send(JSON.stringify({type:'partner_id',data:{id:id}}))
        ws.send(JSON.stringify({type:"partner_id",data:{id:old_id}}))
    }
    people[id] = ws
    //转发                                                                                                                                                            
    ws.onmessage = (evt)=>{
        let full_data = JSON.parse(evt.data)
        let id_to = full_data["id_to"]
        let data = full_data["data"] 
        people[id_to].send(JSON.stringify({type:"message",data:data}))
    }
    function deleteFromSession(evt){
        let del_id
        for(let id in people){
            if(people[id]==ws){
                del_id = id
                break
            }
        }

        if(del_id!=undefined){
            delete people[del_id]
            console.log(del_id+" from session")
            for(let id in people){
                people[id].send(JSON.stringify({type:'del_partner',data:{id:del_id}}))
            }
        }
    }
    ws.onclose = deleteFromSession
    ws.onerror = deleteFromSession
})

server.listen(80,()=>{
    console.log('listening...')
})

