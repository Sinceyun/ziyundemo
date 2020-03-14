var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
router.post('/', (req, res) => {
  const info = req.body
  var sql = ''
  if (info.type === 'updateAdaminPsw') {
    console.log('updatePsw')
    sql = `update admin set password = '${info.password}' where userID = '${info.userID}'`
  } else if (info.type === 'updateAdminInfo') {
    console.log('updateAdminInfo')
    sql = `update admin set name = '${info.name}', phone = '${info.phone}', email = '${info.email}' where userID = '${info.userID}'`
  } else if (info.type === 'updateStudentInfo') {
    console.log('updateStudentInfo')
    sql = `update student set name = '${info.name}', phone = '${info.phone}', email = '${info.email}', zone = '${info.zone}', profession = '${info.profession}' where userID = '${info.userID}'`
  } else if (info.type === 'updateStudentPsw') {
    console.log('updateStudentPsw')
    sql = `update student set password = '${info.password}' where userID = '${info.userID}'`
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
