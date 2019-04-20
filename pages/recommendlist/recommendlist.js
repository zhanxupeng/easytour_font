// pages/recommendlist/recommendlist.js
let app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sliderStyle:{
      step:1,
      min:0,
      max:5,
      activeColor:"#f00",
      backgroundColor:"#ccc",
      blockSize:"20",
      blockColor:"#4bbef5"
    },
    apiUrl: app.globalData.apiUrl,
    recommendList:[],
    request:{}
  },
  clickItem(e){
    let index = e.currentTarget.dataset.index;
    let id=this.data.recommendList[index].id;
    let request=this.data.request;
    wx.navigateTo({
      url: '/pages/recommenditem/recommenditem?sceneryId=' + id + '&categoryList=' + request.categoryList.join(',')+
        '&preferenceList=' + request.preferenceList.join(',') + '&weather=' + request.weather
    }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let request={
      city:options.city,
      categoryList:options.categoryList.split(','),
      preferenceList:options.preferenceList.split(','),
      weather:options.weather
    }
    that.setData({
      request:request
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.backApi.sceneryRecommend,
      data: request,
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: function (res) {
        wx.hideLoading()
        let data = res.data
        let recommendList = data.data
        console.log(recommendList)
        if (data.code === '0') {
          that.setData({
            recommendList:recommendList
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