let app = getApp(); // 取得全局App
// 请求数据
let loadMore = function(that) {
  let requestData = that.data.pageQuery;
  console.log(requestData)
  wx.showLoading({
    title: '加载中',
  })
  //请求网络加载数据，暂时不使用
  wx.request({
    url: app.globalData.backApi.commomSenseList,
    data: requestData,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    success: function(res) {
      //console.info(that.data.list);
      let context=res.data;
      let data =context.data;
      console.log(data)
      if (context.code === '0'){
        let list = that.data.list;
        if (data.length === 0){
          wx.showToast({
            title: '已经到底啦~',
            icon: 'none',
            duration: 2000
          })
        }else{
          for (let i = 0; i < data.length; i++) {
            list.push(data[i]);
          }
          that.setData({
            list: list
          });
        }
      }else{
        wx.showToast({
          title: context.info,
          icon: 'none',
          duration: 2000
        })
      }
      console.log(res)
      
      wx.hideLoading()
    }
  });

  // 模拟网络请求
  // setTimeout(function(){
  //   let list = that.data.list;
  //   for (let i = 1; i <= requestData.pageSize; i++) {
  //     list.push({
  //       id: '1',
  //       title: '20个小诀窍，玩出高大上的旅行' + ((requestData.currentPage - 1) * requestData.pageSize + i),
  //       image: '/image/nous_eg.jpg'
  //     })
  //   }
  //   console.log(list)
  //   that.setData({
  //     list: list
  //   });
  //   wx.hideLoading()
  // },1000);
}

Page({
  data: {
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    pageQuery: {
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页条数
    },
    apiUrl: app.globalData.apiUrl
  },
  onLoad() {
    let that = this;
    // 设置滚动框的高度
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });

    loadMore(that);
  },
  //滚动的时候监听现在滚动到什么地方了
  scroll: function(event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },

  //滚动到底部刷新
  bindDownLoad: function() {
    let that = this;
    that.setData({
      pageQuery: {
        currentPage: that.data.pageQuery.currentPage + 1, // 当前页码
        pageSize: 5, // 每页条数
      }
    })
    loadMore(that)
    
  },

  //滚动到顶部刷新
  topLoad: function(event) {
    let that = this;
    that.setData({
      list:[],
      pageQuery: {
        currentPage: 1, // 当前页码
        pageSize: 5, // 每页条数
      }
    })
    loadMore(that)
  }
})