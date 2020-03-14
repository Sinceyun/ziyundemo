var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
router.get('/', (req, res) => {
  const info = req.query
  var sql = ''
  console.log(info)
  if (info.type === 'receive') {
    console.log(info.type)
    sql = `select sendid, receiveid, msg, DATE_FORMAT(time, '%Y-%m-%d %H:%i:%S') as time from message where receiveid = '${info.receiveid}'`
  } else {
    console.log('dddd' + info.type)
    sql = `select sendid, receiveid, msg, DATE_FORMAT(time, '%Y-%m-%d %H:%i:%S') as time from message where sendid = '${info.sendid}'`
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
