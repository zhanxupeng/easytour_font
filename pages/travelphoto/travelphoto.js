// pages/travelphoto/travelphoto.js
let app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '1', value: '城市精选', checked: true },
      { name: '2', value: '网红打卡地', checked: false },
      { name: '3', value: '特色住宿', checked: false },
      { name: '4', value: '最美风景', checked: false },
      { name: '5', value: '文艺之旅', checked: false },
      { name: '6', value: '当地美食', checked: false }
    ],
    travelPhotoList: [],
    apiUrl: app.globalData.apiUrl
  },
  radioChange(e) {
    let items = this.data.items;
    let current = e.detail.value;
    for (let i = 0; i < items.length; i++) {
      if (items[i].name === current) {
        items[i].checked = true;
      } else {
        items[i].checked = false;
      }
    }
    console.log(items)
    this.setData({
      items: items
    })
    this.getListData()
  },
  itemCheck(e) {
    let id = this.data.travelPhotoList[e.currentTarget.dataset.index].id;
    wx.navigateTo({
      url: '/pages/travelphotodetail/travelphotodetail?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData()
  },
  getListData() {
    let that = this;
    let items = that.data.items;
    let type = items.filter(x => x.checked === true).map(x => x.name)[0]

    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.backApi.travelphotoList,
      data: {
        category: type
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function (res) {
        wx.hideLoading()
        let data = res.data
        let dataList = data.data
        if (data.code === '0') {
          that.setData({
            travelPhotoList: dataList
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