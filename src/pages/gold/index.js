const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    totalWeight: 0,
    totalCost: 0,
    estimatedValue: 0,
    estimatedProfit: 0,
    goldList: [],
    searchQuery: '',
    showSearch: false
  },

  onLoad() {
    this.loadGoldList()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  // 处理图标点击
  onIconTap(e) {
    const name = e.currentTarget.dataset.name
    switch(name) {
      case 'search':
        this.toggleSearch()
        break
      case 'filter':
        this.showFilter()
        break
      case 'more':
        this.showMore()
        break
    }
  },

  // 切换搜索框显示
  toggleSearch() {
    this.setData({
      showSearch: !this.data.showSearch
    })
  },

  // 显示筛选选项
  showFilter() {
    wx.showActionSheet({
      itemList: ['按时间排序', '按重量排序', '按收益排序'],
      success: (res) => {
        // TODO: 处理筛选逻辑
        console.log('选择的筛选选项：', res.tapIndex)
      }
    })
  },

  // 显示更多选项
  showMore() {
    wx.showActionSheet({
      itemList: ['导出记录', '设置', '帮助'],
      success: (res) => {
        // TODO: 处理更多选项逻辑
        console.log('选择的更多选项：', res.tapIndex)
      }
    })
  },

  // 处理搜索输入
  onSearch(e) {
    const searchQuery = e.detail.value
    this.setData({ searchQuery })
    // TODO: 实现搜索逻辑
    console.log('搜索关键词：', searchQuery)
  },

  loadGoldList() {
    // TODO: 从服务器加载数据
    const mockData = [
      {
        id: 1,
        name: '工商银行黄金',
        price: 389,
        weight: 10,
        amount: 3890,
        profit: 100,
        date: '2024-03-20'
      },
      {
        id: 2,
        name: '中国银行黄金',
        price: 390,
        weight: 5,
        amount: 1950,
        profit: -50,
        date: '2024-03-19'
      }
    ]
    
    this.setData({
      goldList: mockData,
      totalWeight: mockData.reduce((sum, item) => sum + item.weight, 0),
      totalCost: mockData.reduce((sum, item) => sum + item.amount, 0),
      estimatedValue: mockData.reduce((sum, item) => sum + item.amount + item.profit, 0),
      estimatedProfit: mockData.reduce((sum, item) => sum + item.profit, 0)
    })
  }
}) 