var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
router.post('/', (req, res) => {
  const info = req.body
  var day = new Date()
  const time = day.toLocaleString()
  const sql = `insert into message (sendid, receiveid, msg, time) values ('${info.sendid}', '${info.receiveid}', '${info.msg}', '${time}')`
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
