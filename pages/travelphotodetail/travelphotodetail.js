// pages/travelphotodetail/travelphotodetail.js
let app = getApp(); // 取得全局App
let apiUrl = app.globalData.apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    apiUrl: app.globalData.apiUrl,
    imgUrls: [
      apiUrl + '/image/show.do?imagePath=pictures%5Cswiper%5Cmain_a.jpg',
      apiUrl + '/image/show.do?imagePath=pictures%5Cswiper%5Cmain_b.jpg',
      apiUrl + '/image/show.do?imagePath=pictures%5Cswiper%5Cmain_c.jpg',
      apiUrl + '/image/show.do?imagePath=pictures%5Cswiper%5Cmain_d.jpg',
      apiUrl + '/image/show.do?imagePath=pictures%5Cswiper%5Cmain_e.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.backApi.travelphotoDetail,
      data: {
        id: options.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function(res) {
        wx.hideLoading()
        let data = res.data
        let travelPhoto = data.data
        if (data.code === '0') {
          that.setData({
            detail: travelPhoto
          })
        } else {
          wx.showToast({
            title: data.info,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})