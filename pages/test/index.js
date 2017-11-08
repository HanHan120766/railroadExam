// <!-- Hna Qian -->
var makeData = require('../../utils/makeDataSource.js')
var dataSource = makeData.getTypeDataSource()
var danxuan = 50
var duoxuan = 10
var panduan = 40
var round = [211, 107, 283]
var mathRound = [[],[],[]]
Page({
  data: {
    type: 0,//0.单选  1.多选  2.判断
    data: {},
    danxuanOrPanduan: 'E',
    duoxuan: [],
    examNum: [[1],[1],[1]],
    duoxuanShow: [false, false, false, false],
    defen: 0,
    isNowExam: false
  },
  onLoad: function () {
    console.log(dataSource)
    for (var i=0;i<danxuan;i++) {
      this.mathRound(0)
    }
    for (var i=0;i<duoxuan;i++) {
      this.mathRound(1)
    }
    for (var i=0;i<panduan;i++) {
      this.mathRound(2)
    }
    console.log(mathRound)
    this.getData()
  },

  mathRound: function (e) {
    var index = Math.round(Math.random()*round[e])
    var isSame = false
    mathRound[e].forEach((v, k) => {
      if (v == index) {
        this.mathRound(e)
        isSame = true
        return
      }
    })
    if (!isSame) {
      mathRound[e].push(index)
    }
  },

  getData: function () {
    this.setData({
      data: dataSource[this.data.type][mathRound[this.data.type][this.data.examNum[this.data.type] - 1]]
    })
  },

  onclickCell: function (e) {
    var id = e.currentTarget.dataset.id
    if (this.data.type == 0 || this.data.type == 2) {
      this.setData({
        danxuanOrPanduan: id
      })
    }else {
      var items = this.data.duoxuan
      var isSame = false

      items.forEach((v, k) => {

        if (v == id) {
          var arr = this.data.duoxuan
          arr.splice(k, 1)
          this.setData({
            duoxuan: arr
          })
          isSame = true
          console.log(arr)
        }
      })

      if (!isSame) {
        var array = this.data.duoxuan
        array.push(id)
        console.log(array)
        this.setData({
          duoxuan: array
        })
      }
      this.makeChoosed()
    }

  },

  makeChoosed: function () {
    var items = [false, false, false, false]
    items[0] = this.judgeArray('A')
    items[1] = this.judgeArray('B')
    items[2] = this.judgeArray('C')
    items[3] = this.judgeArray('D')
    this.setData({
      duoxuanShow: items
    })
  },

  judgeArray: function (e) {
    var index = false
    this.data.duoxuan.forEach((v, k) => {
      if (e == v) {
        index = true
      }
    })

    return index
  },

  getResult: function () {
    if (this.data.isNowExam) {
      wx.showModal({
          title: '正确答案',
          content: this.data.data['正确选项'],
          confirmColor: '#ff3939',
          showCancel: false,
          success: function (res) {
          }
      })
      return
    }
    var daan = this.data.data['正确选项']
    daan=daan.replace(" ","");
    if (this.data.type == 0 || this.data.type == 2) {
      this.makeDanxuanAndPanduan(daan)
    }else {
      var res = this.data.duoxuan.sort().join('')
      this.makeDuoxuan(daan, res)
    }

  },

  makeDuoxuan: function (item1, item2) {
    if (item2 == '') {
      wx.showModal({
          title: '提示',
          content: '请选择答案',
          confirmColor: '#ff3939',
          showCancel: false,
          success: function (res) {
          }
      })
    }else if (item2 == item1) {
      this.setData({
        isNowExam: true
      })
      var num = this.data.defen
      num++
      this.setData({
        defen: num
      })
      wx.showModal({
          title: '提示',
          content: '666，你答对了',
          confirmColor: '#ff3939',
          showCancel: false,
          success: function (res) {
          }
      })
    }else {
      this.setData({
        isNowExam: true
      })
      wx.showModal({
          title: '提示',
          content: '真笨，错了',
          confirmColor: '#ff3939',
          showCancel: false,
          success: function (res) {
          }
      })
    }
  },

  makeDanxuanAndPanduan: function (daan) {
    if (this.data.danxuanOrPanduan == 'E') {
      wx.showModal({
          title: '提示',
          content: '请选择答案',
          confirmColor: '#ff3939',
          showCancel: false,
          success: function (res) {
          }
      })
    }else if (this.data.danxuanOrPanduan == daan) {
      this.setData({
        isNowExam: true
      })
      var num = this.data.defen
      num++
      this.setData({
        defen: num
      })
      wx.showModal({
          title: '提示',
          content: '666，你答对了',
          confirmColor: '#ff3939',
          showCancel: false,
          success: function (res) {
          }
      })
    }else {
      this.setData({
        isNowExam: true
      })
      wx.showModal({
          title: '提示',
          content: '真笨，错了',
          confirmColor: '#ff3939',
          showCancel: false,
          success: function (res) {
          }
      })
    }
  },
  next: function () {
    var arr = this.data.examNum
    arr[this.data.type]++
    if (this.data.type == 0 && arr[this.data.type] == 51) {
      this.setData({
        type: 1
      })
    }
    if (this.data.type == 1 && arr[this.data.type] == 11) {
      this.setData({
        type: 2
      })
    }
    if (this.data.type == 2 && arr[this.data.type] == 41) {
      wx.showModal({
          title: '成绩',
          content: '最后得分' + this.data.defen,
          confirmColor: '#ff3939',
          showCancel: false,
          success: function (res) {
            mathRound = [[],[],[]]
            wx.navigateBack()
          }
      })
      return
    }

    this.getData()
    this.setData({
      danxuanOrPanduan: 'E',
      examNum: arr,
      isNowExam: false,
      duoxuanShow: [false, false, false, false],
      duoxuan: []
    })
  }
})
