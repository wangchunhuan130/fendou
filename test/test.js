var app=getApp()
var util=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class:"",
    words:"",
    sports:"",
    study:"",
    img:"",
    struggle:"",
    flag:true,
    data:[10],
    show:false,
    showbutton:true,
    showbutton2:true,
    isactive:false,
    imgB64:'',
    beauty:"",
    time:util.formatDate(new Date()),
    day:"",
    temp:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //这里onload里面给予一个判断今天是不是已经上传过奋斗值，
  //对功能进行限定，做了一个弹窗，点击（和签到那个类似）如果两个值相等就换成别的按钮
  onLoad: function (options) {
    var that=this;
    wx.showModal({
      title:"欢  迎 ！！！",
      content:"欢迎来到您的奋斗小屋",
      showCancel:false,
      confirmText:"我来了！",
      success:function(){
        that.setData({
          temp:wx.getStorageSync('temp'),
          day:util.day(new Date()),
        })
        if(that.data.temp==that.data.day){
          that.setData({
            showbutton2:false,
          })
        }else{
          that.setData({
            showbutton2:true,
          })
        }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    
  },
  //这里的input就是输入框的值
input1:function(e){
  var input=(e.detail.value)
  //这里对输入框的值进行了限定
 if(!isNaN(input)){
  this.setData({
    class:input
  })
 }
},
input2:function(e){
var input=(e.detail.value)
if(!isNaN(input)){
  this.setData({
    words:input
  })
}
},
input3:function(e){
  var input=(e.detail.value)
  if(!isNaN(input)){
    this.setData({
sports:input
    })
  }
},
input4:function(e){
  var input=(e.detail.value)
  if(!isNaN(input)){
    this.setData({
      study:input,
    })
  }
},
//上传图片和调用百度人脸颜值检测api，
chooseImg: function () {
  var that=this;
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      const tempFilePaths = res.tempFilePaths[0];
      that.getB64ByUrl(tempFilePaths);
      that.setData({
        img: tempFilePaths,
        showbutton: false
      });
    }
  })
},
//因为上传给百度服务器的照片得转成base64，所以做了一个转换
getB64ByUrl: function (url) {
  var that=this;
  const FileSystemManager = wx.getFileSystemManager();
  FileSystemManager.readFile({
    filePath: url,
    encoding: 'base64',
    success(res) {
      that.setData({
        imgB64: res.data
      });
    }
  })
},
beautyTap: function (e) {
  var that=this;
  const imgB64 = that.data.imgB64;
  if (!imgB64) {
    wx.showToast({
      title: '请上传图片',
    })
    return;
  };
  that.getToken(function (token) {
    that.getBeauty(token);
  });
},
//此处是按钮的实现功能
getToken: function (callback) {
  var that=this;
  wx.request({
    url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=YMBE3uCIt8iVRMOuuB6AOKcY&client_secret=Uo2NUMoDOLYc3bOzGjsqyBeBzly5huRC',
    success(res) {
      var token = res.data.access_token;
      return callback(token);
    }
  });
},
getBeauty:function (token){
  var that=this;
      wx.request({
       method:"POST",
        url: "https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=" + token,
        data:{
          face_field:'age,beauty,gender,expression,face_shape,glasses,emotion',
          image_type:'BASE64',
          image: that.data.imgB64,
          max_face_num:1
        },
        header:{
          'Content-Type':'application/x-www-form-urlencoded'
        },
        success(res)
        {
          console.log(res)
          that.setData({
            beauty:res.data.result.face_list[0].beauty,
          })
        }
       
      })
},
//加权计算得出最终奋斗值并保存
test:function(){
  let test1=wx.getStorageSync('test1')||[10]
//这里用if对输入框里面的数据进行检测
  if(this.data.class==""||this.data.words==""||this.data.sports==""||this.data.study==""){
       wx.showModal({
         title:"小提示",
         content:"还未输入今日奋斗数据",
         showCancel:false,
       })
  
  }
  //这里为了不让它的最后数值出现一个溢出做了一个修改
  else{
    if (this.data.class>10) {
      this.setData({
        class:10,
      })
    }if(this.data.words>100){
          this.setData({
             words:100,
          })
    }if(this.data.sports>50){
      this.setData({
        sports:50,
      })
    }
    if(this.data.study>100){
    this.setData({
      study:100,
    })
    }
      var result=this.data.class*1+this.data.words*0.1+this.data.sports*0.2+this.data.study*0.6+this.data.beauty*0.1;
      this.setData({
        struggle:result+"分-----记录："+this.data.time,
        flag:false,
        temp:this.data.day,
        showbutton2:false,
      }),
      test1.unshift(this.data.struggle);
      wx.setStorageSync("test1",test1);
      wx.setStorageSync('temp', this.data.temp);
    
  }
},
//跳转页面查看
history:function(){
  wx.navigateTo({
    url:"../paiming/paiming",
  })
 
},
//最后的实现一天提交一次数据
yitijiao:function(){
  wx.showModal({
    title:"今日奋斗辛苦了！",
    content:"劳累的一天结束了，快去玩一下吧！",
    showCancel:false,
    confirmText:"去玩喽",
  })
},


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})