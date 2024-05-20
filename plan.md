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


































