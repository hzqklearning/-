const express = require("express")
const https = require("https")
const web_socket = require("ws")
const fs = require("fs")
// web_socket_server  1v1
const options = {
    key:fs.readFileSync("/root/https/server/server_key.pem"),
    cert:fs.readFileSync("/root/https/server/server_crt.pem")
}
const server = https.createServer(options)
const wss = new web_socket.Server({server})


const app = express()
app.get("/",(req,res)=>{
    var dir = process.cwd()
    res.sendFile(dir+"/pages/client_main.html")
    // console.log("aaaaaa")
})
server.on("request",app)


function createID(){
    return Math.random().toString(16).substring(2,6)
}

var people = {}

wss.on("connection",(ws)=>{
    var id = createID()
    console.log(' 新的连接建立,id分配为: '+id)
    for(old_id in people){
        people[old_id].send(JSON.stringify({type:'partner_id',data:{id:id}}))
        ws.send(JSON.stringify({type:"partner_id",data:{id:old_id}}))
    }
    people[id] = ws
    //转发                                                                                                                                                            
    ws.onmessage = (evt)=>{
        var full_data = JSON.parse(evt.data)
        var id_to = full_data["id_to"]
        var data = full_data["data"] //string
        // console.log(people)
        // console.log(id_to)
        people[id_to].send(JSON.stringify({type:"message",data:data}))
    }
    function deleteFromSession(evt){
        var del_id
        for(let id in people){
            if(people[id]==ws){
                del_id = id
                break
            }
        }
        if(del_id!=undefined){
            delete people[del_id]
            console.log(del_id+" from session")
            // console.log(sockets)
            for(let id in people){
                people[id].send(JSON.stringify({type:'del_partner',data:{id:del_id}}))
            }
        }
    }
    ws.onclose = deleteFromSession
    ws.onerror = deleteFromSession
})

server.listen(3333,()=>{
    console.log('listening...')
})
