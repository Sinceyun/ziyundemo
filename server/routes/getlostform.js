var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
router.get('/', (req, res) => {
  const info = req.query
  var sql = ''
  if (info.type === 'alllostform') {
    sql = `select lostformid, publicid, title, sort, DATE_FORMAT(losttime, '%Y-%m-%d') as losttime, place, description,picture, DATE_FORMAT(publictime, '%Y-%m-%d %H:%i:%S') as publictime, status from lostform`
  } else if (info.type === 'search') {
    sql = `select lostformid, publicid, title, sort, DATE_FORMAT(losttime, '%Y-%m-%d') as losttime, place, description,picture, DATE_FORMAT(publictime, '%Y-%m-%d %H:%i:%S') as publictime, status from lostform where place = '${info.place}' AND sort= '${info.sort}' AND status = '${info.status}'`
  } else {
    sql = `select lostformid, publicid, title, sort, DATE_FORMAT(losttime, '%Y-%m-%d') as losttime, place, description,picture, DATE_FORMAT(publictime, '%Y-%m-%d %H:%i:%S') as publictime, status from lostform where publicid = '${info.publicid}' AND status = '${info.status}'`
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
