var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
router.post('/', (req, res) => {
  const info = req.body
  var sql = ''
  if (info.type === 'delete') {
    console.log('delete')
    sql = `delete from student where userID = '${info.userID}'`
  } else {
    console.log('update')
    sql = `update student set password = '123456' where userID = '${info.userID}'`
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
