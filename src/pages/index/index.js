import { hello } from '@/utils/util'
import ActionSheet, { ActionSheetTheme } from 'tdesign-miniprogram/action-sheet/index'
import * as echarts from '@/components/ec-canvas/echarts'

const app = getApp()

// 模拟数据
const mockData = {
  realtime: {
    dates: ['03-23', '03-24', '03-25', '03-26', '03-27', '03-28', '03-29'],
    prices: [710.5, 715.2, 719.7, 722.3, 718.9, 720.1, 719.7]
  },
  '1m': {
    dates: Array.from({length: 30}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }),
    prices: [
      680, 682, 685, 688, 690, 688, 692, 695, 698, 700,
      698, 702, 705, 708, 710, 708, 712, 715, 718, 720,
      718, 722, 725, 728, 730, 728, 732, 735, 738, 740
    ]
  },
  '3m': {
    dates: Array.from({length: 90}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (89 - i));
      return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }),
    prices: Array.from({length: 90}, (_, i) => {
      const basePrice = 600;
      const trend = i / 2; // 整体上涨趋势
      const fluctuation = Math.sin(i / 10) * 10; // 添加波动
      const random = (Math.random() - 0.5) * 5; // 添加随机性
      return Math.round((basePrice + trend + fluctuation + random) * 100) / 100;
    })
  }
};

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  })
  canvas.setChart(chart)

  const option = {
    backgroundColor: 'transparent',
    grid: {
      left: '3%',
      right: '3%',
      bottom: '8%',
      top: '3%',
      containLabel: false
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderColor: '#FFD700',
      borderWidth: 1,
      padding: [8, 12],
      textStyle: {
        color: '#FFD700'
      },
      formatter: function(params) {
        const data = params[0];
        return [
          `{price|¥${data.value}}`,
          `{date|${data.name}}`
        ].join('\n');
      },
      rich: {
        price: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#FFD700',
          padding: [0, 0, 4, 0],
          lineHeight: 24
        },
        date: {
          fontSize: 11,
          color: '#FFD700',
          opacity: 0.8,
          lineHeight: 14
        }
      },
      position: function (pos, params, el, elRect, size) {
        const xPos = pos[0];
        // 根据点在图表中的位置决定提示框显示在左侧还是右侧
        if (xPos > size.viewSize[0] / 2) {
          return { left: xPos - 120, top: 10 };
        } else {
          return { left: xPos + 20, top: 10 };
        }
      },
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#FFD700',
          opacity: 0.5,
          width: 1
        }
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      show: false,
      data: mockData.realtime.dates
    },
    yAxis: {
      type: 'value',
      scale: true,
      show: false,
      splitLine: {
        show: false
      }
    },
    series: [{
      name: '黄金价格',
      type: 'line',
      smooth: 0.5,
      symbol: 'none',
      sampling: 'average',
      itemStyle: {
        color: '#FFD700',
        borderColor: '#FFD700',
        borderWidth: 2
      },
      lineStyle: {
        color: '#FFD700',
        width: 3
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(255, 215, 0, 0.15)'
        }, {
          offset: 0.8,
          color: 'rgba(255, 215, 0, 0.08)'
        }, {
          offset: 1,
          color: 'rgba(255, 215, 0, 0)'
        }])
      },
      data: mockData.realtime.prices
    }],
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicOut'
  }

  chart.setOption(option)
  return chart
}

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    mode: 'light',
    goldPrice: '719.70',
    newsList: [
      {
        id: 1,
        title: '国际金价创新高，突破2100美元/盎司',
        summary: '受全球经济不确定性影响，避险情绪推动金价持续上涨...',
        time: '10分钟前',
        image: 'https://example.com/news1.jpg'
      },
      {
        id: 2,
        title: '央行增持黄金储备，连续第12个月净买入',
        summary: '数据显示，我国黄金储备规模持续扩大，显示对黄金的长期信心...',
        time: '30分钟前'
      },
      {
        id: 3,
        title: '黄金回收市场活跃，二手金价格上涨',
        summary: '随着金价上涨，黄金回收市场交易活跃，回收价格创近年新高...',
        time: '1小时前',
        image: 'https://example.com/news3.jpg'
      }
    ],
    timeRanges: [
      { label: '实时', value: 'realtime' },
      { label: '近一月', value: '1m' },
      { label: '近三月', value: '3m' }
    ],
    selectedRange: 'realtime',
    ec: {
      onInit: initChart,
      forceUseOldCanvas: true
    }
  },
  switchMode() {
    if (this.data.mode === 'light') {
      this.setData({
        mode: 'dark',
      })
    }
    else {
      this.setData({
        mode: 'light',
      })
    }
  },
  async copy(e) {
    if (e.mark?.url) {
      await wx.setClipboardData({
        data: e.mark.url,
      })
      console.log(`复制成功: ${e.mark.url}`)
    }
  },
  handleSelected(e) {
    console.log(e.detail)
  },
  onLoad() {
    console.log(hello())
    this.fetchGoldPrice()
    this.fetchNews()
    this.fetchTrendData()
  },
  handleAction() {
    ActionSheet.show({
      theme: ActionSheetTheme.Grid,
      selector: '#t-action-sheet',
      context: this,
      items: firstGrid,
      align: 'center',
      description: '',
    })
  },
  // 获取黄金价格
  fetchGoldPrice() {
    // TODO: 实现黄金价格API调用
  },
  // 获取新闻资讯
  fetchNews() {
    // TODO: 实现新闻资讯API调用
  },
  // 获取趋势数据
  fetchTrendData() {
    const chart = this.selectComponent('#gold-trend-chart')
    if (chart && chart.chart) {
      const data = mockData[this.data.selectedRange]
      chart.chart.setOption({
        xAxis: {
          data: data.dates
        },
        series: [{
          data: data.prices
        }]
      })
      // 更新显示的金价为最新价格
      this.setData({
        goldPrice: data.prices[data.prices.length - 1].toFixed(2)
      })
    }
  },
  // 选择时间范围
  onRangeSelect(e) {
    const range = e.currentTarget.dataset.range
    this.setData({ selectedRange: range }, () => {
      this.fetchTrendData()
    })
  },
  // 订阅价格提醒
  onSubscribe() {
    wx.showModal({
      title: '订阅提醒',
      content: '是否订阅黄金价格变动提醒？',
      success: (res) => {
        if (res.confirm) {
          // TODO: 实现订阅逻辑
          wx.showToast({
            title: '订阅成功',
            icon: 'success'
          })
        }
      }
    })
  },
  // 搜索处理
  onSearch(e) {
    const keyword = e.detail.value
    console.log('搜索关键词：', keyword)
    // TODO: 实现搜索功能
  },
  // 查看更多新闻
  onMoreNews() {
    // TODO: 实现查看更多新闻功能
  },
  // 查看新闻详情
  onNewsDetail(e) {
    const { id } = e.currentTarget.dataset
    // TODO: 跳转到新闻详情页
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  // 处理图标点击
  onIconTap(e) {
    const name = e.currentTarget.dataset.name
    switch(name) {
      case 'search':
        // 处理搜索
        break
      case 'more':
        // 处理更多
        break
    }
  }
})
