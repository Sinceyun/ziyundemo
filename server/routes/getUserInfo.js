var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
router.get('/', (req, res) => {
  const info = req.query
  var sql = ''
  if (info.type === 'getAdminInfo') {
    console.log('getAdminInfo')
    sql = `select * from admin`
  } else if (info.type === 'getStudentInfo') {
    console.log('getStudentInfo')
    sql = `select * from student where userID = '${info.userID}'`
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
