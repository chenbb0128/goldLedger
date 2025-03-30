Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#FFD700",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/assets/icons/home.png",
      selectedIconPath: "/assets/icons/home-active.png",
      text: "动态"
    }, {
      pagePath: "/pages/gold/index",
      iconPath: "/assets/icons/gold.png",
      selectedIconPath: "/assets/icons/gold-active.png",
      text: "攒金"
    }, {
      pagePath: "/pages/add/index",
      iconPath: "/assets/icons/add.png",
      selectedIconPath: "/assets/icons/add-active.png",
      text: ""
    }, {
      pagePath: "/pages/account/index",
      iconPath: "/assets/icons/account.png",
      selectedIconPath: "/assets/icons/account-active.png",
      text: "记账"
    }, {
      pagePath: "/pages/profile/index",
      iconPath: "/assets/icons/profile.png",
      selectedIconPath: "/assets/icons/profile-active.png",
      text: "我的"
    }]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({ url });
      this.setData({
        selected: data.index
      });
    }
  }
}) 