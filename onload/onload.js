// pages/onload/onload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    artistname:"1",
    name:"2",
    picture:"../../images/me1.png",
    mp3:"4",
    flag:true,
    src:"",
  },
  reset:function(){
     console.log(this.data.data[0])
  },
  request:function(){
     var that=this;
       wx.request({
         sort:"",
         url: 'https://api.uomg.com/api/rand.music?sort=热歌榜&format=json',
         success:function(e){
          that.setData({
            picture:e.data.data.picurl,
            artistname:e.data.data.artistsname,
            name:e.data.data.name,
            mp3:e.data.data.url,
            src:e.data.data.url,
            flag:false,
          })
          console.log(e)
         }
       })
  },
  audioPlay:function(){
  this.audioCtx.play()
  },
  audioPause:function(){
    this.audioCtx.pause()
  },
audioStart:function(){
  this.audioCtx.seek(0)
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      wx.createAudioContext('myAudio')
      this.audioCtx=wx.createAudioContext('myAudio')
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