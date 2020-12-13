Page({

  /**
   * 页面的初始数据
   */
  data: {
    place:"",
    weather:"",
    wind:"",
    ziwaixian:"",
    data:[10],
    number:"",
    arr:[10],
    scores1:"",  scores2:"",  scores3:"",  scores4:"",  scores5:"",  scores6:"",  scores7:"",  scores8:"",  scores9:"",  scores10:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var appid=	448091;
    var secret="542fe10ffe9a475c8b88816543272dc3";
    wx.request({
      url: 'https://route.showapi.com/9-4',
      data:{
         showapi_appid:appid,
         showapi_sign:secret,
      },
      success:function(e){
   that.setData({
    place:e.data.showapi_res_body.cityInfo.c5,
    weather:e.data.showapi_res_body.f1.day_weather,
    wind:e.data.showapi_res_body.f1.day_wind_direction+e.data.showapi_res_body.f1.day_wind_power,
    ziwaixian:e.data.showapi_res_body.f1.ziwaixian,
   })
      }
    })
    this.setData({
      data:wx.getStorageSync('test1'),
    })
     this.arr=[this.data.data[0],this.data.data[1],this.data.data[2],this.data.data[3],this.data.data[4],this.data.data[5],this.data.data[6],this.data.data[7],this.data.data[8],this.data.data[9]]
    this.arr.sort()
    this.arr=this.arr.reverse()
    console.log(this.arr)
    this.setData({
      scores1:this.arr[0],
      scores2:this.arr[1],
      scores3:this.arr[2],
      scores4:this.arr[3],
      scores5:this.arr[4],
      scores6:this.arr[5],
      scores7:this.arr[6],
      scores8:this.arr[7],
      scores9:this.arr[8],
      scores10:this.arr[9],
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      Flag:true,
    })
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      success: (res) => {},
    })
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