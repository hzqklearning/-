var ws_server = require('nodejs-websocket')

ws_server.createServer(connection=>{
    console.log('new connection...')

    connection.on("text",function(data){
        console.log("接收到的客户端消息:" +data)
        connection.sendText("服务器收到信息："+data)
    })

	connection.on("close",function(code,reason){
		console.log("连接关闭，代码："+code+",原因"+reason)
	})

	connection.on("error",function(err){
		console.error("连接发生错误:",err)
	})
	
}).listen(3000,function(){
    console.log('等待连接...')
})
