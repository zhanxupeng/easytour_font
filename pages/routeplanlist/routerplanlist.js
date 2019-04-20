// pages/routeplanlist/routerplanlist.js
let app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sliderStyle: {
      step: 1,
      min: 0,
      max: 5,
      activeColor: "#f00",
      backgroundColor: "#ccc",
      blockSize: "20",
      blockColor: "#4bbef5"
    },
    apiUrl: app.globalData.apiUrl,
    routePlanList: [],
    city: null,
    categoryList: null,
    preferenceList: null,
    weather: null
  },

  itemCheck(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/routeplanitem/routeplanitem?idList=' + that.data.routePlanList[index].idList.join(',') + '&categoryList=' +
        that.data.categoryList + '&preferenceList=' + that.data.preferenceList + '&weather=' + that.data.weather
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // { city: "杭州", categoryList: "NATURE", preferenceList: "ENTERTAINMENT", weather: "CLOUDY" }
    let that = this
    let city = options.city;
    let categoryList = options.categoryList;
    let preferenceList = options.preferenceList;
    let weather = options.weather;
    that.setData({
      city: city,
      categoryList: categoryList,
      preferenceList: preferenceList,
      weather: weather
    })
    let requestData = {
      city: city,
      categoryList: categoryList.split(','),
      preferenceList: preferenceList.split(','),
      weather: weather
    }

    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: app.globalData.backApi.routePlan,
      data: requestData,
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: function(res) {
        wx.hideLoading()
        let data = res.data
        let routePlanList = data.data
        console.log(routePlanList)
        if (data.code === '0') {
          that.setData({
            routePlanList: routePlanList
          })

        } else {
          wx.showToast({
            title: data.info,
            icon: 'none',
            duration: 2000
          })
          setTimeout(function() {
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