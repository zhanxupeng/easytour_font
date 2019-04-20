// pages/mall/mall.js
let app = getApp(); // 取得全局App
let apiUrl = app.globalData.apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      apiUrl + '/image/show.do?imagePath=pictures%5Cshop%5Cshop_wiper_one.png',
      apiUrl + '/image/show.do?imagePath=pictures%5Cshop%5Cshop_wiper_two.png',
      apiUrl + '/image/show.do?imagePath=pictures%5Cshop%5Cshop_wiper_three.png',
      apiUrl + '/image/show.do?imagePath=pictures%5Cshop%5Cshop_wiper_four.png',
      apiUrl + '/image/show.do?imagePath=pictures%5Cshop%5Cshop_wiper_five.png'
    ],
    indicatorDots: true,
    apiUrl: apiUrl,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: true
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