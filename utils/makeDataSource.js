let data = require('dataSource.js')

function getTypeDataSource () {
  var type1 = [];
  var type2 = [];
  var type3 = [];

  data.forEach((v, k) => {
    if (v['试题类型'] == 1) {
      type1.push(v)
    }else if (v['试题类型'] == 2) {
      type2.push(v)
    }else if (v['试题类型'] == 3) {
      type3.push(v)
    }
  })
  return [
    type1,
    type2,
    type3,
  ]
}

module.exports = {
  getTypeDataSource: getTypeDataSource
}
