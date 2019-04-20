//app.js
let apiUrl = "https://192.168.33.105:8443";
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: {
      sessionId: null
    },
    apiUrl: apiUrl,
    backApi: {
      customerRegister: apiUrl + '/customer/register.pub', //注册
      customerLogin: apiUrl + '/customer/login.pub', //登录
      customerUserInfo: apiUrl + '/customer/userInfo.do', //获取用户信息
      commomSenseList: apiUrl + '/commomSense/query.pub', //小常识列表
      dayQuestionQuestion: apiUrl + '/dayQuestion/question.do', //每日一题问题
      dayQuestionAnswer: apiUrl + '/dayQuestion/answer.do', //每日一题答案
      travelphotoList: apiUrl + '/travelphoto/travelList.pub', //旅拍列表
      travelphotoDetail: apiUrl + '/travelphoto/travelDetail.pub', //旅拍详情
      sceneryRecommend: apiUrl + '/scenery/recommend.pub', //景色推优
      sceneryDetail: apiUrl + '/scenery/recommendDetail.pub', //景色详情
      routePlan: apiUrl + '/scenery/routePlan.pub', //路线推荐
      planDetail: apiUrl + '/scenery/planDetail.pub' //路线详情
    }
  }
})