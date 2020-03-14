var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
router.get('/', (req, res) => {
  const info = req.query
  const sql = `select sendid, receiveid, msg, DATE_FORMAT(time, '%Y-%m-%d %H:%m:%S') as time from message where receiveid = '${info.receiveid}'`
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
