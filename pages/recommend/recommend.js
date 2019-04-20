// pages/recommend/recommend.js
// 自然风光、历史遗迹、名人故居、公园乐园、建筑人文、特色街区、影视城、宗教场所、民风民俗
let app = getApp(); // 取得全局App
let apiUrl = app.globalData.apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiUrl:apiUrl,
    city:'',
    categoryList: [
      { name: 'NATURE', value: '自然风光', checked:false},
      { name: 'HISTORY', value: '历史遗迹', checked: false},
      { name: 'FORMER_RESIDENCE', value: '名人故居', checked: false},
      { name: 'PARK', value: '公园乐园', checked: false},
      { name: 'ARCHITECTURE', value: '建筑人文', checked: false},
      { name: 'SPECIAL_BLOCK', value: '特色街区', checked: false},
      { name: 'MOVIE_CITY', value: '影视城', checked: false},
      { name: 'RELIGION', value: '宗教场所', checked: false},
      { name: 'SOCIAL_CUSTOM', value: '民风民俗', checked: false}
    ],
    preferenceList:[
      { name: 'ENTERTAINMENT', value: '娱乐', checked: false},
      { name: 'QUIET', value: '安静', checked: false},
      { name: 'NATURAL', value: '自然', checked: false},
      { name: 'HISTORY', value: '历史', checked: false},
      { name: 'LIVELY', value: '热闹', checked: false},
      { name: 'STIMULATE', value: '刺激', checked: false},
      { name: 'CONCEALMENT', value: '隐蔽', checked: false}
    ],
    weatherList:[
      { name: 'SUNNY', value: '晴', checked: false},
      { name: 'CLOUDY', value: '多云', checked: false},
      { name: 'RAIN', value: '雨天', checked: false}
    ]
  },
  categoryChange: function (e) {
    let currentCheck = e.detail.value;
    let categoryList = this.data.categoryList;
    for (let i = 0; i < categoryList.length; i++) {
      let findResult = currentCheck.find(function (value) {
        if (categoryList[i].name === value) {
          return true
        }
        return false
      })
      if (findResult) {
        categoryList[i].checked = true
      } else {
        categoryList[i].checked = false
      }
    }
    this.setData(
      {
        categoryList: categoryList
      }
    )
  },
  preferenceChange(e){
    let currentCheck = e.detail.value;
    let preferenceList = this.data.preferenceList;
    for (let i = 0; i < preferenceList.length; i++) {
      let findResult = currentCheck.find(function (value) {
        if (preferenceList[i].name === value) {
          return true
        }
        return false
      })
      if (findResult) {
        preferenceList[i].checked = true
      } else {
        preferenceList[i].checked = false
      }
    }
    this.setData(
      {
        preferenceList: preferenceList
      }
    )
  },
  weatherChange(e){
    let currentCheck = e.detail.value;
    let weatherList = this.data.weatherList;
    for (let i = 0; i < weatherList.length; i++) {
      if(currentCheck===weatherList[i].name){
        weatherList[i].checked = true
      }else{
        weatherList[i].checked = false
      }
    }
    this.setData(
      {
        weatherList: weatherList
      }
    )
  },
  bindInputCity(e){
    this.setData({
      city:e.detail.value
    })
  },
  recommendSearch(){
    let that = this;
    let city=that.data.city;
    if(city ===''){
      wx.showToast({
        title: '必须输入城市哦',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    let categoryList=that.data.categoryList.filter(x=>x.checked===true).map(x=>x.name);
    let preferenceList=that.data.preferenceList.filter(x=>x.checked===true).map(x=>x.name);
    let weatherList=that.data.weatherList.filter(x=>x.checked===true).map(x=>x.name);
    let weather=null;
    if(weatherList.length>0){
      weather=weatherList[0];
    }
    wx.navigateTo({
      url: '/pages/recommendlist/recommendlist?city='+city+'&categoryList='+
      categoryList.join(',')+'&preferenceList='+preferenceList.join(',')+'&weather='+weather
    }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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