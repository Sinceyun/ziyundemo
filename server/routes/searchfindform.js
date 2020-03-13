var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
router.get('/', (req, res) => {
  const info = req.query
  console.log(info)
  const sql = `select findformid, publicid, title, sort, DATE_FORMAT(findtime, '%Y-%m-%d') as findtime, place, description, picture, DATE_FORMAT(publictime, '%Y-%m-%d %H:%m:%S') as publictime, status from findform where sort = '${info.sort}' AND place = '${info.place}' AND status = '${info.status}'`
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
