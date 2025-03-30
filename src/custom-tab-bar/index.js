Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#F59E0B",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "行情",
        iconPath: "/assets/icons/market.png",
        selectedIconPath: "/assets/icons/market-active.png"
      },
      {
        pagePath: "/pages/gold/index",
        text: "",
        iconPath: "/assets/icons/add.png",
        selectedIconPath: "/assets/icons/add.png",
        isSpecial: true
      },
      {
        pagePath: "/pages/gold/index",
        text: "攒金",
        iconPath: "/assets/icons/gold.png",
        selectedIconPath: "/assets/icons/gold-active.png"
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const index = data.index
      
      if (this.data.list[index].isSpecial) {
        // 处理添加按钮点击
        wx.showActionSheet({
          itemList: ['添加黄金', '添加记录'],
          success: (res) => {
            if (res.tapIndex === 0) {
              wx.navigateTo({
                url: '/pages/gold/add/index'
              })
            } else if (res.tapIndex === 1) {
              wx.navigateTo({
                url: '/pages/gold/record/index'
              })
            }
          }
        })
        return
      }

      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: index
      })
    }
  }
}) 