var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
router.post('/', (req, res) => {
  const info = req.body
  const sql = `insert into findform (findformid, publicid, title, sort, findtime, place, description, picture, publictime, status) values ('${info.findformid}', '${info.publicid}', '${info.title}', '${info.sort}', '${info.findtime}', '${info.place}',' ${info.description}', '${info.picture}', '${info.publictime}', '${info.status}')`
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
