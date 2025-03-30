Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    showSearch: {
      type: Boolean,
      value: false
    },
    transparent: {
      type: Boolean,
      value: false
    }
  },

  data: {
    statusBarHeight: 0,
    navBarHeight: 44
  },

  lifetimes: {
    attached() {
      const systemInfo = wx.getSystemInfoSync();
      this.setData({
        statusBarHeight: systemInfo.statusBarHeight
      });
    }
  },

  methods: {
    onSearch(e) {
      this.triggerEvent('search', e.detail);
    }
  }
}) 