// pages/routeplanitem/routeplanitem.js
let app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/image/a.jpg',
      '/image/b.jpg',
      '/image/c.jpg',
      '/image/d.jpg',
      '/image/e.jpg'
    ],
    routeDetailList:[],
    apiUrl: app.globalData.apiUrl,
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: true,
    sliderStyle: {
      step: 1,
      min: 0,
      max: 5,
      activeColor: "#f00",
      backgroundColor: "#ccc",
      blockSize: "20",
      blockColor: "#4bbef5"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this
        // { city: "杭州", categoryList: "NATURE", preferenceList: "ENTERTAINMENT", weather: "CLOUDY" }
    let idList=options.idList.split(',');
    let categoryList=options.categoryList.split(',');
    let preferenceList=options.preferenceList.split(',');
    let weather = options.weather;

    let requestData={
      idList,
      categoryList,
      preferenceList,
      weather
    }
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: app.globalData.backApi.planDetail,
      data: requestData,
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: function (res) {
        wx.hideLoading()
        let data = res.data
        let routeDetailList = data.data
        console.log(routeDetailList)
        if (data.code === '0') {
          that.setData({
            routeDetailList: routeDetailList
          })

        } else {
          wx.showToast({
            title: data.info,
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
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