var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
router.post('/', (req, res) => {
  const info = req.body
  const lostformid = randomString(8)
  var day = new Date()
  const publictime = day.toLocaleString()
  const sql = `insert into lostform (lostformid, publicid, title, sort, losttime, place, description, picture, publictime, status) values ('${lostformid}', '${info.publicid}', '${info.title}', '${info.sort}', '${info.losttime}', '${info.place}',' ${info.description}', '${info.picture}', '${publictime}', '${info.status}')`
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

function randomString (n) {
  const str = 'abcdefghijklmnopqrstuvwxyz9876543210'
  let tmp = ''
  let i = 0
  const l = str.length
  for (i = 0; i < n; i++) {
    tmp += str.charAt(Math.floor(Math.random() * l))
  }
  return tmp
}
