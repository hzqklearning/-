<mark>入门音视频开发 5月19日-</mark>

**5月19日：**  
初探音视频开发，了解了音视频的播放原理，图像，音频，字幕的基本知识和视频的封装格式。  
**总结：**  
1. 音视频开发的场景：短视频，点播，直播，云游戏，各种和播放视频有关的...
1. 音视频开发的基本对象：音频，视频和字幕  
2. 音视频播放的原理（本地播放没有解协议这一步）：解协议->解封装->解码->音视频同步->播放  
3. 狭义的视频就是一组图像序列，图像在编码前的常见格式有YUV和RGB。H.264标准是现在应用比较广泛的视频编码标准。
   - H.264由视频编码层（VCL）和网络适配层（NAL）组成。
   - H.264对视频数据编码/压缩后，图片可以被分成I帧，P帧，B帧，IDR帧，所属某个GOP
     - I帧(Intra-coded picture，帧内编码图像帧)：关键帧，采用类似JPEG压缩的DCT压缩技术
     - P帧(Predictive-coded picture，前向预测编码图像帧):参考帧，表示跟之前的一个关键帧或P帧的差别，它可能造成解码错误的扩散。
     - B帧(Bidirectionally predicted picture，双向预测编码图像帧)：本帧与前后帧（I或P帧）的差别，压缩率高，但解码消耗CPU。
     - IDR帧(instantaneous Decoding Refresh，即时解码刷新)：首个I帧，在IDR帧之后的所有帧都不能引用任何IDR帧之前的帧的内容。IDR帧具有随机访问的能力，播放器可以从任何一个IDR帧播放。
     - GOP(Group Of Picture，图像序列)：两个I帧之间是一个图像序列，一个GOP包含一个I帧。
   - H.264中的DTS(Decoding Time Stamp，解码时间戳)，PTS(Presentation Time Stamp，显示时间戳)
4. 采集到的原始音频数据比如PCM格式，压缩后的音频数据比如AAC格式
   - PCM(Pulse Code Modulation，脉冲编码调制)音频数据是未经压缩的音频采样数据裸流，它是由模拟信号经过采样，量化，编码转换成的标准数字音频数据。
   - AAC(Advanced Audio Coding，高级音频编码)是一种音频数据的文件压缩格式。分为ADIF和ADTS两种文件格式。
     - ADIF(Audio Data Interchange Format，音频数据交换格式)：解码必须在明确定义的开始处进行。常用在磁盘文件中。
     - ADTS(Audio Data Transport Stream，音频数据传输流)：解码可以在这个流中任何位置开始。
5. 字幕的格式：srt,ssa,ass
6. 视频封装格式：
   - FLV(Flash Video)：FLV = FLV Header + FLV Body,Body由一个个的Tag组成，FLV Tag = Tag Header + Tag Data，Tag Header 存放了当前Tag的类型，数据长度、时间戳、时间戳扩展等信息，然后再接着数据区Tag Data。Tag Data又分成Audio，Video，Script三种。
   - TS(Transport Stream,传输流)，一个流中可以有多个TS：
     - 分为三层：TS(Transport Stream)，PES层(Packet Elemental Stream)，ES层(Elementary Stream，基本码流)
     - ES层：就是音视频编码数据流，比如视频H.264，音频AAC。一个ES流中只包含一种类型的数据(视频，音频或字幕)
     - PES层：打包的ES，在ES层的基础上加入了时间戳(PTS,DTS)等信息。
     - TS层：固定为188字节，分成三个部分
       - ts header
       - adaptation field：主要作用给不足188字节的数据做填充
       - payload：PES数据或者PAT或者PMT
   - MP4(MPEG-4):树形结构  

**问题：**  
1. 音视频播放为什么需要封装这一步，视频和音频单独分开发送不可以吗？  
2. “协议”这一步的作用，音视频在网络传输中为什么需要“协议”这一步？  
3. H.264可以理解为一种压缩规则吗？  
4. H.264中网络适配层（NAL）的作用？
5. NALU是什么？通过H.264得到的结果是什么？
6. I帧一定是IDR帧吗？  
7. ADTS是如何实现解码可以在这个流中任何位置开始的？  
8. 人的声音是由什么决定的，除了频率和幅度还有其他因素吗，如何量化？  
9. 为什么TS是固定大小为188字节，有什么考量？  
10. 为什么视频封装格式FLV,TS,MP4的结构都比较复杂，特别是有很多的头部信息，完成的功能有哪些？视频封装的目的不就是把视频和音频包装在一起发送吗，为什么需要那么多的头部信息？  

**5月22日：**
找视频通话相关项目，了解项目架构  
**总结:**  
https://zhuanlan.zhihu.com/p/624357784  
一对一视频通话：  
1. 基于WebRTC(Web Real-Time Communications)，一种实时通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，建立浏览器之间点对点（Peer-to-Peer）的连接，实现视频流和音频流或者其他任意数据的传输。
2. 通讯过程：
   1. 用户A和用户B获取自身的NAT后的地址（STUN Server  candidate）
   2. 用户A和用户B通过一台中间服务器（信令服务器）交换各自支持的格式和NAT后的IP等信息。（ICE框架下  媒体协商SDP和网络协商candidate   RTCPeerConnection对象必须先addTrack，再setLocalDescription，这样的SDP信息才是有效的）
   3. 用户A和用户B开始连接通讯。（ICE框架  NAT穿越，穿越成功，P2P；否则借助中继服务器转发） 
3. STUN：一种网络协议，其目的是进行NAT穿越。能够检测网络中是否存在 NAT 设备，有就可以获取到 NAT 分配的 IP + 端口地址，然后建立一条可穿越NAT的P2P连接（这一过程就是打洞）。
4. TURN：TURN 是 STUN 协议的扩展协议，其目的是如果 STUN 在无法打通的情况下（对称NAT），能够正常进行连接，其原理是通过一个中继服务器进行数据转发，此服务器需要拥有独立的公网 IP。 
5. 各组件作用：
   - 信令服务器：
      1. 客户端之间在P2P前先建立初始连接
      2. 信息转发（不关注信息的type）
   - coturn服务器（为了实现P2P）：
      1. 实现STUN协议，客户端可获取到NAT后地址，candidate
      2. 实现TURN协议，P2P失败后的中继
   - 客户端： 
      1. 解析信息的type并采取相应行为  

**问题：**  
1. 如何和对方建立初始连接？  
   通过信令服务器交换对方的必要信息->尝试P2P通信（由于防火墙等原因，需要通过某种方式建立“白名单”），实在不行通过中继服务器（TURN服务器）转发
2. 如何确定双方共同支持的音视频格式？ 

**5月28日：**  
实现了在局域网内的信令服务器，客户端在能够访问信令服务器的前提下可以进行通信。  
**5月29日：**   
必要组件准备：  
1. 将信令服务器部署在了阿里云上，通过访问地址可以进入一个聊天室互相文字通信  
https://ecs.console.aliyun.com/server/i-bp1esun2ssvn8zkti5kh/detail?regionId=cn-hangzhou   
(注意控制台要放行相应端口)
阿里云服务器登陆密码：03160316aA  
https证书签名密码：03160316

2. coturn搭建：https://cloud.tencent.com/developer/article/1730301  
realm = hzq.com  
3. 使用OpenSSL自建一个HTTPS服务：https://www.cnblogs.com/Hui4401/p/14128112.html  
（在http下，出于安全考量，navigator.mediaDevices.getUserMedia()会被浏览器拒绝，因此需要https）  

总结：  
1. Linux命令：
   - nohup忽略挂起信号 
   - &放置后台
   - nohup [commond] & 可以使命令在关闭终端的时候也一直运行   
   - 通过ps -ef找到对应的进程号，再kill，可以停止nohup对应的命令  https://www.cnblogs.com/yunwangjun-python-520/p/10713564.html https://blog.csdn.net/qq_36079986/article/details/110294300  
2. 编写js代码可以参考状态机 状态+事件->行为+下一个状态  

问题：  
1. js里的异步函数 async?  
2. 协商冲突怎么解决？
3. 把(track,stream)加到peer_connection中是触发candidate收集的关键步骤，track和stream的关系  
4. https的原理  
5. 版本管理


WebRTC参考：  
https://zhuanlan.zhihu.com/p/624357784  
https://developers.google.cn/codelabs/webrtc-web?hl=zh-cn#3  
https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Perfect_negotiation#perfect_negotiation_concepts  


模拟在一时刻网络突然崩溃的情况，客户端积极尝试重连
  如何知道网络突然崩溃了-> onclose事件触发
  客户端需不需要重新创建ws -> 需要
  多个ws会不会重叠，都和服务器建立了连接 -> 等待前一个ws关闭了之后，再创建一个新的




























