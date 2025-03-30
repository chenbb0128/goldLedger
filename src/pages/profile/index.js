Page({
  data: {
    userInfo: {
      avatar: '',
      nickname: ''
    },
    stats: {
      totalDays: 0,
      totalGold: '0.00',
      totalLedgerDays: 0
    }
  },

  onLoad() {
    this.fetchUserInfo()
    this.fetchUserStats()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4
      })
    }
  },

  // 获取用户信息
  fetchUserInfo() {
    // TODO: 实现获取用户信息
  },

  // 获取用户统计数据
  fetchUserStats() {
    // TODO: 实现获取用户统计数据
  },

  // 客服
  onService() {
    wx.showToast({
      title: '正在接入客服',
      icon: 'loading'
    })
  },

  // 金价预警
  onPriceAlert() {
    wx.navigateTo({
      url: '/pages/settings/price-alert'
    })
  },

  // 密码锁
  onPasswordLock() {
    wx.navigateTo({
      url: '/pages/settings/password-lock'
    })
  },

  // 回收站
  onRecycleBin() {
    wx.navigateTo({
      url: '/pages/recycle-bin/index'
    })
  },

  // 导入数据
  onImportData() {
    wx.showActionSheet({
      itemList: ['从文件导入', '从云端导入'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // TODO: 实现从文件导入
        } else {
          // TODO: 实现从云端导入
        }
      }
    })
  },

  // 导出数据
  onExportData() {
    wx.showActionSheet({
      itemList: ['导出到文件', '备份到云端'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // TODO: 实现导出到文件
        } else {
          // TODO: 实现备份到云端
        }
      }
    })
  }
}) 