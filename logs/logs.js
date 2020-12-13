var util=require('../../utils/util')
const back = wx.getBackgroundAudioManager();
Page({
  data: {
    time1:"",
    times:"0",
    month:"",
    day:"",
    temp:"",
    temp2:"",
    total:"0",
    showbutton:false,
  },
  //这里实现签到功能，我们检测是不是过了一天，让按下时把今天的值赋给temp并储存在本地然后对比两个的是否相同，
 // 同时如果过了一个月它会自动清0
  qiandao:function(){
    this.data.temp=this.data.month;
    this.data.temp2=this.data.day;
     this.setData({
       times:this.data.times+1,
       total:this.data.times+1,
       showbutton:false,
     })
     wx.setStorageSync('times', this.data.times)
     wx.setStorageSync('temp', this.data.temp)
    wx.setStorageSync('temp2', this.data.temp2)
    wx.setStorageSync('total', this.data.total)
    
   }, 
   //这里是调用API的部分，里面还包含着temp和day的判断
  test:function(){
    var appid=454268;
    var secret="76bda65fdf4548f6b7658ec57547c044"
    var th=this;
    wx.request({
      url:"https://api.tianapi.com/txapi/lzmy/index?key=70b4517993e78741a3216c340d49740c",
      data:{
      },
      success:function(res){
        console.log(res);
        th.setData({
          result:res.data
        })
      }
    })
    //此处就是储存后的temp与当前时间进行比对决定是否要签到
    if(this.data.temp==""||this.data.temp2==""){
      this.setData({
        showbutton:true,
        })
      }else{
        if(this.data.temp!=this.data.month){
          this.setData({
            times:0,
          })
        }else{
          if(this.data.temp2==this.data.day){
            this.setData({
              showbutton:false,
            })
          }else{
            this.setData({
              showbutton:true,
            })
          }
        }
      }
  
  },
  backmusic:function(){
    player();
    function player(){
      back.title = "free sunlight";
      back.src = "https://music.163.com/song/media/outer/url?id=36953773.mp3";
      back.onEnded(() => {
        player();
      })
    }
  },
  //时间获取和获取本地储存的一些值我们放在了onLoad里面让它能够在一开始就完成
onLoad: function (options) {
  //这里是背景音乐模块
  this.backmusic();
//这里就是获取
  this.setData({
    time1:util.formatDate(new Date()),
    month:util.month(new Date()),
    day:util.day(new Date()),
    times:wx.getStorageSync('times'),
    temp:wx.getStorageSync('temp'),
    temp2:wx.getStorageSync('temp2'),
    total:wx.getStorageSync('total'),
   
  })

}
})