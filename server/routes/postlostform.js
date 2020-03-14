var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
router.post('/', (req, res) => {
  const info = req.body
  var sql = ''
  console.log(info)
  if (info.type === 'delete') {
    console.log('delete')
    sql = `delete from lostform where lostformid = '${info.lostformid}'`
  } else {
    console.log('update')
    sql = `update lostform set status = '已找到' where lostformid = '${info.lostformid}'`
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
