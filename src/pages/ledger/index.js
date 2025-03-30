Page({
  data: {
    currentDate: '',
    dateVisible: false,
    monthlyExpense: '0.00',
    monthlyIncome: '0.00',
    monthlyBalance: '0.00',
    categories: [
      { id: 1, name: '餐饮', icon: 'fork' },
      { id: 2, name: '买菜', icon: 'shop' },
      { id: 3, name: '水果', icon: 'heart' },
      { id: 4, name: '购物', icon: 'shop-bag' },
      { id: 5, name: '交通', icon: 'car' }
    ],
    bills: [
      {
        date: '今天',
        items: [
          {
            id: 1,
            category: '餐饮',
            icon: 'fork',
            amount: '38.00',
            time: '12:30',
            type: 'expense'
          },
          {
            id: 2,
            category: '工资',
            icon: 'money',
            amount: '5000.00',
            time: '09:00',
            type: 'income'
          }
        ]
      },
      {
        date: '昨天',
        items: [
          {
            id: 3,
            category: '购物',
            icon: 'shop-bag',
            amount: '199.00',
            time: '15:20',
            type: 'expense'
          }
        ]
      }
    ]
  },

  onLoad() {
    // 设置当前月份
    const today = new Date()
    const currentDate = today.toISOString().split('T')[0].slice(0, 7)
    this.setData({ currentDate })
    
    this.fetchMonthlyBills()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },

  // 显示日期选择器
  showDatePicker() {
    this.setData({ dateVisible: true })
  },

  // 日期选择确认
  onDateConfirm(e) {
    this.setData({
      currentDate: e.detail.value,
      dateVisible: false
    }, () => {
      this.fetchMonthlyBills()
    })
  },

  // 日期选择取消
  onDateCancel() {
    this.setData({ dateVisible: false })
  },

  // 快捷记账
  onQuickAdd(e) {
    const categoryId = e.currentTarget.dataset.category
    wx.navigateTo({
      url: `/pages/add-bill/index?category=${categoryId}`
    })
  },

  // 获取月度账单
  fetchMonthlyBills() {
    // TODO: 实现获取月度账单数据
    this.calculateMonthlyStatistics()
  },

  // 计算月度统计
  calculateMonthlyStatistics() {
    let expense = 0
    let income = 0

    this.data.bills.forEach(day => {
      day.items.forEach(bill => {
        const amount = parseFloat(bill.amount)
        if (bill.type === 'expense') {
          expense += amount
        } else {
          income += amount
        }
      })
    })

    this.setData({
      monthlyExpense: expense.toFixed(2),
      monthlyIncome: income.toFixed(2),
      monthlyBalance: (income - expense).toFixed(2)
    })
  }
}) 