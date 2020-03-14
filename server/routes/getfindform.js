var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
router.get('/', (req, res) => {
  const info = req.query
  var sql = ''
  if (info.type === 'allfindform') {
    sql = `select findformid, publicid, title, sort, DATE_FORMAT(findtime, '%Y-%m-%d') as findtime, place, description,picture, DATE_FORMAT(publictime, '%Y-%m-%d %H:%i:%S') as publictime, status from findform`
  } else {
    sql = `select findformid, publicid, title, sort, DATE_FORMAT(findtime, '%Y-%m-%d') as findtime, place, description,picture, DATE_FORMAT(publictime, '%Y-%m-%d %H:%i:%S') as publictime, status from findform where publicid = '${info.publicid}' AND status = '${info.status}'`
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
