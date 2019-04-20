let app = getApp(); // 取得全局App
let apiUrl = app.globalData.apiUrl
Page({
  data: {
    unLoginShow: true,
    inLoginShow: false,
    userInfo: {
      goldCoin:0,
      nickName: '小雪',
      userName: '1314520',
      sex: '1',
    },
    apiUrl:apiUrl,
    functionList: [{
      imageUrl: apiUrl + '/image/show.do?imagePath=pictures%5Cperson%5Cpoint_shop.png',
        description: '积分商城',
        clickFunction: 'integralShop'
      },
      {
        imageUrl: apiUrl + '/image/show.do?imagePath=pictures%5Cperson%5Cperson_message.png',
        description: '个人信息',
        clickFunction: 'myMessage'
      },
      {
        imageUrl: apiUrl + '/image/show.do?imagePath=pictures%5Cperson%5Chistory.png',
        description: '历史记录',
        clickFunction: 'hostory'
      },
      {
        imageUrl: apiUrl + '/image/show.do?imagePath=pictures%5Cperson%5Ccollection.png',
        description: '我的收藏',
        clickFunction: 'myCollection'
      },
      {
        imageUrl: apiUrl + '/image/show.do?imagePath=pictures%5Cperson%5Csetup.png',
        description: '设置',
        clickFunction: 'systemSet'
      },
      {
        imageUrl: apiUrl + '/image/show.do?imagePath=pictures%5Cperson%5Cquit.png',
        description:'退出',
        clickFunction:'quit'
      }
    ]
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this
    let app = getApp(); // 取得全局App
    let userInfo = app.globalData.userInfo;
    if (userInfo.sessionId === undefined || userInfo.sessionId === null) {
      this.setData({
        unLoginShow: true,
        inLoginShow: false
      })
    } else {

      wx.showLoading({
        title: '获取中',
      })
      wx.request({
        url: app.globalData.backApi.customerUserInfo,
        data: {
          sessionId: userInfo.sessionId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        success: function(res) {
          console.log('res')
          console.log(res)
          //console.log(res.data)
          wx.hideLoading()
          // if (res.statusCode == 200) {
          //   success(res.data)
          // } else {
          //   fail()
          // }
          let context = res.data
          let data = context.data
          if (context.code === '0') {
            that.setData({
              unLoginShow: false,
              inLoginShow: true,
              userInfo: {
                nickName: data.nickName,
                userName: data.userName,
                sex: data.sex,
                goldCoin: data.goldCoin
              }
            })
          } else {
            wx.showToast({
              title: context.info,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },

  login() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  register() {
    wx.navigateTo({
      url: '/pages/register/register'
    })
  },
  quit(){
    wx.showLoading({
      title: '退出中',
    })
    app.globalData.userInfo.sessionId=null
    this.setData({
      unLoginShow: true,
      inLoginShow: false
    })
    wx.hideLoading()
  },
  integralShop(event) {
    // let index = event.currentTarget.dataset.index
    // wx.showToast({
    //   title: this.data.functionList[index].description,
    //   icon: 'success',
    //   mask: true,
    //   duration: 2000
    // })
    let goldCoin = this.data.userInfo.goldCoin;
    wx.navigateTo({
      url: '/pages/pointsshop/pointsshop?goldCoin=' + goldCoin
    })
  },
  myMessage(event) {
    let index = event.currentTarget.dataset.index
    wx.showToast({
      title: this.data.functionList[index].description,
      icon: 'success',
      duration: 2000
    })
  },
  hostory(event) {
    let index = event.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '这是' + this.data.functionList[index].description,
      showCancel: false,
      cancelText: '取消',
      confirmText: '确定',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  myCollection(event) {
    let index = event.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '这是' + this.data.functionList[index].description,
      showCancel: false,
      cancelText: '取消',
      confirmText: '确定',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  serviceChange(event) {
    let index = event.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '这是' + this.data.functionList[index].description,
      showCancel: false,
      cancelText: '取消',
      confirmText: '确定',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  systemSet(event) {
    let index = event.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '这是' + this.data.functionList[index].description,
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})