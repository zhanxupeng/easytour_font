// pages/dayquestion/dayquestion.js
let app = getApp(); // 取得全局App
let apiUrl = app.globalData.apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'A', value: 'A、3月22号' },
      { name: 'B', value: 'B、5月31号' },
      { name: 'C', value: 'C、6月5号' },
      { name: 'D', value: 'D、6月12号' }
    ],
    apiUrl:apiUrl,
    answer:null,
    question:'测试问题？'
  },
  radioChange: function (e) {
    this.setData({
      answer:e.detail.value
    })
  },
  answerQuestion(){
    let answer=this.data.answer;
    let sessionId = app.globalData.userInfo.sessionId;
    if(answer===null){
      wx.showToast({
        title: '必须选择一个答案哦',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.backApi.dayQuestionAnswer,
      data: {
        sessionId: sessionId,
        answer: answer
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function (res) {
        wx.hideLoading()
        let context = res.data;
        let data = context.data;
        if (context.code === '0') {
          wx.showToast({
            title: data,
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: context.info,
            icon: 'none',
            duration: 2000
          })
        }
        
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let sessionId = app.globalData.userInfo.sessionId;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.backApi.dayQuestionQuestion,
      data: {
        sessionId: sessionId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function (res) {
        let context = res.data;
        let data = context.data;
        if (context.code === '0') {
          console.log(data)
          let items=[];
          items.push({
            name:'A',
            value: 'A、' + data.answera
          })
          items.push({
            name: 'B',
            value: 'B、' + data.answerb
          })
          items.push({
            name: 'C',
            value: 'C、' + data.answerc
          })
          items.push({
            name: 'D',
            value: 'D、' + data.answerd
          })
          console.log(items)
          that.setData({
            items:items,
            question: data.question
          })
          console.log(that.data)
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