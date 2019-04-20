// pages/login/login.js
let app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userNameFlag: false,
    loginDisabled: true,
    apiUrl:app.globalData.apiUrl
  },
  userLogin(e) {
    console.log(e)
    console.log(e.detail.value.userName)
    console.log(e.detail.value.password)
    wx.showLoading({
      title: '登录中',
    })
    wx.request({
      url: app.globalData.backApi.customerLogin,
      data: {
        userName: e.detail.value.userName,
        password: e.detail.value.password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function(res) {
        //console.log(res.data)
        wx.hideLoading()
        // if (res.statusCode == 200) {
        //   success(res.data)
        // } else {
        //   fail()
        // }
        let data = res.data
        let userInfo = data.data
        console.log(userInfo)
        if (data.code === '0') {
          app.globalData.userInfo.sessionId = userInfo.sessionId
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            mask: true,
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/main/main'
            })
          }, 2000)
        } else {
          wx.showToast({
            title: data.info,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    // wx.showToast({
    //   title: '登录成功',
    //   icon: 'success',
    //   mask: true,
    //   duration: 2000
    // })
    // app.globalData.userInfo={
    //   nickName:'Roc',
    //   userName:'15356171125',
    //   sex:'0'
    // }
    // wx.switchTab({
    //   url: '/pages/main/main'
    // })
  },
  userNameBlur(e) {
    if (e.detail.value !== null && e.detail.value !== '') {
      this.data.userNameFlag = true;
    } else {
      this.data.userNameFlag = false;
    }
  },
  passwordBindinput(e) {
    if (e.detail.value != null && e.detail.value.length >= 6) {
      this.setData({
        loginDisabled: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    console.log(app.globalData.backApi)
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