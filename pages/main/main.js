let app = getApp(); // 取得全局App
let apiUrl=app.globalData.apiUrl
Page({
  data: {
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
    circular:true,
    proList: null,
    logoList:[
      {
        title:'景点选优',
        image: apiUrl +'/image/show.do?imagePath=pictures%5Ctab%5Crecommend.png',
        clickEvent:'recommend'
      },
      {
        title: '路线规划',
        image: apiUrl +'/image/show.do?imagePath=pictures%5Ctab%5Crouteplan.png',
        clickEvent: 'routeplan'
      },
      {
        title: '旅拍',
        image: apiUrl +'/image/show.do?imagePath=pictures%5Ctab%5Ctravelphoto.png',
        clickEvent: 'travelphoto'
      },
      {
        title: '商城',
        image: apiUrl +'/image/show.do?imagePath=pictures%5Ctab%5Cshop.png',
        clickEvent: 'mall'
      },
      {
        title: '每日一题',
        image: apiUrl +'/image/show.do?imagePath=pictures%5Ctab%5Cdayquestion.png',
        clickEvent: 'dayquestion'
      }
    ],
    recommend: apiUrl + '/image/show.do?imagePath=pictures%5Ccommon%5Camerican.jpg'
  },
  recommend(){
    wx.navigateTo({
      url: '/pages/recommend/recommend'
    })
  },
  routeplan(){
    wx.navigateTo({
      url: '/pages/routeplan/routeplan'
    })
  },
  travelphoto(){
    wx.navigateTo({
      url: '/pages/travelphoto/travelphoto'
    })
  },
  mall(){
    wx.navigateTo({
      url: '/pages/mall/mall'
    })
  },
  dayquestion(){
    let sessionId = app.globalData.userInfo.sessionId
    if(sessionId === null){
      wx.showToast({
        title: '必须登录才能答题哦',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.backApi.dayQuestionQuestion,
      data: {
        sessionId:sessionId 
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function (res) {
        console.log('res')
        console.log(res)
        let context = res.data;
        let data = context.data;
        if (context.code === '0') {
          wx.navigateTo({
            url: '/pages/dayquestion/dayquestion'
          })
        } else {
          wx.showToast({
            title: context.info,
            icon: 'none',
            duration: 2000
          })
        }
        wx.hideLoading()
      }
    });
  },
  // 页面加载 一个页面只会执行一次
  onLoad: function () {
    console.log('onLoad')
  },
  // 页面显示，每次打开页面都会调用一次
  onShow(){

  },
  // 页面初次渲染完成
  onReady(){

  },
  // 页面隐藏
  onHide(){

  },
  // 页面卸载
  onUnload(){
    
  }
})
