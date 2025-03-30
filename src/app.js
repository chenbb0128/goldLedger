App({
  globalData: {
    StatusBar: 0,
    CustomBar: 0,
    Custom: null
  },

  onLaunch() {
    try {
      const windowInfo = wx.getWindowInfo();
      this.globalData.StatusBar = windowInfo.statusBarHeight;
      let capsule = wx.getMenuButtonBoundingClientRect();
      if (capsule) {
        this.globalData.Custom = capsule;
        this.globalData.CustomBar = capsule.bottom + capsule.top - windowInfo.statusBarHeight;
      } else {
        this.globalData.CustomBar = windowInfo.statusBarHeight + 50;
      }
    } catch (error) {
      console.error('初始化过程出错:', error);
    }
  }
}) 