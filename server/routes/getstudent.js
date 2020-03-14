var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
router.get('/', (req, res) => {
  const info = req.query
  var sql = ''
  if (info.type === 'allstudent') {
    sql = `select userID, name, phone, profession from student`
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
