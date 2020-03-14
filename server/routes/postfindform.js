var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
router.post('/', (req, res) => {
  const info = req.body
  var sql = ''
  if (info.type === 'delete') {
    console.log('delete')
    sql = `delete from findform where findformid = '${info.findformid}'`
  } else {
    console.log('update')
    sql = `update findform set status = '已找到' where findformid = '${info.findformid}'`
  }
  connection.query(sql, (err, result) => {
    if (err) {
      throw err
    } else {
      res.json(result)
      console.log('results', result)
    }
  })
})
module.exports = router
