// pages/register/register.js
let app = getApp();
let notEmpty = function(val) {
  return val !== undefined && val !== null && val !== ''
}
let notAnyEmpty = function(data) {
  return data.userNameFlag && data.passwordFlag && data.rePasswordFlag &&
    data.nicknameFlag && data.sexFlag;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex:null,
    userNameFlag: false,
    passwordFlag: false,
    rePasswordFlag: false,
    rePassword: '',
    nicknameFlag: false,
    sexFlag: false,
    registerDisabled: true,
    apiUrl:app.globalData.apiUrl
  },
  userRegister(e) {
    console.log(e.detail.value)
  //   private String userName;
  // private String password;
  // private String nickName;
  // private String sex;
    wx.showLoading({
      title: '注册中',
    })
    wx.request({
      url: app.globalData.backApi.customerRegister,
      data: {
        userName: e.detail.value.userName,
        password: e.detail.value.password,
        nickName: e.detail.value.nickName,
        sex: this.data.sex
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()
        let context = res.data
        let data = context.data
        if (context.code === '0') {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            mask: true,
            duration: 2000
          })
          
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/login/login'
            })
          }, 2000)
        } else {
          wx.showToast({
            title: context.info,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  userNameInput(e) {
    this.setData({
      userNameFlag: notEmpty(e.detail.value)
    })

    this.setData({
      registerDisabled: !notAnyEmpty(this.data)
    })
  },
  passwordInput(e) {
    this.setData({
      passwordFlag: notEmpty(e.detail.value),
      rePassword: ''
    })

    this.setData({
      registerDisabled: !notAnyEmpty(this.data)
    })
  },
  rePasswordInput(e) {
    this.setData({
      rePasswordFlag: notEmpty(e.detail.value)
    })

    this.setData({
      registerDisabled: !notAnyEmpty(this.data)
    })
  },
  nicknameInput(e) {
    this.setData({
      nicknameFlag: notEmpty(e.detail.value)
    })

    this.setData({
      registerDisabled: !notAnyEmpty(this.data)
    })
  },
  sexChange(e) {
    
    this.setData({
      sex:e.detail.value,
      sexFlag: notEmpty(e.detail.value)
    })

    this.setData({
      registerDisabled: !notAnyEmpty(this.data)
    })
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