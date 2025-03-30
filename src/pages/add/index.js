Page({
  data: {
    weight: '',
    price: '',
    date: '',
    remark: '',
    dateVisible: false,
    totalAmount: '0.00'
  },

  onLoad() {
    // 设置默认日期为今天
    const today = new Date()
    const dateStr = today.toISOString().split('T')[0]
    this.setData({
      date: dateStr
    })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },

  // 重量变化
  onWeightChange(e) {
    const weight = e.detail.value
    this.setData({ weight }, () => {
      this.calculateTotal()
    })
  },

  // 价格变化
  onPriceChange(e) {
    const price = e.detail.value
    this.setData({ price }, () => {
      this.calculateTotal()
    })
  },

  // 计算总价
  calculateTotal() {
    const { weight, price } = this.data
    if (weight && price) {
      const total = (parseFloat(weight) * parseFloat(price)).toFixed(2)
      this.setData({
        totalAmount: total
      })
    }
  },

  // 显示日期选择器
  showDatePicker() {
    this.setData({
      dateVisible: true
    })
  },

  // 日期选择确认
  onDateConfirm(e) {
    this.setData({
      date: e.detail.value,
      dateVisible: false
    })
  },

  // 日期选择取消
  onDateCancel() {
    this.setData({
      dateVisible: false
    })
  },

  // 备注变化
  onRemarkChange(e) {
    this.setData({
      remark: e.detail.value
    })
  },

  // 提交表单
  handleSubmit() {
    const { weight, price, date, remark, totalAmount } = this.data
    
    if (!weight || !price) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }

    const goldRecord = {
      weight: parseFloat(weight),
      price: parseFloat(price),
      date,
      remark,
      totalAmount: parseFloat(totalAmount),
      createTime: new Date().toISOString()
    }

    // TODO: 保存记录到存储
    console.log('添加黄金记录：', goldRecord)

    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 2000,
      success: () => {
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    })
  }
}) 