var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var loginRouter = require('./routes/login')
var addfindform = require('./routes/addfindform')
var getfindform = require('./routes/getfindform')
var searchfindform = require('./routes/searchfindform')
var sendMsg = require('./routes/sendMsg')
var getMsg = require('./routes/getMsg')
var deleteMsg = require('./routes/deleteMsg')
var postfindform = require('./routes/postfindform')
var getstudent = require('./routes/getstudent')
var poststudent = require('./routes/poststudent')
var getlostform = require('./routes/getlostform')
var postlostform = require('./routes/postlostform')
var addlostform = require('./routes/addlostform')
var postUserInfo = require('./routes/postUserInfo')
var getUserInfo = require('./routes/getUserInfo')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/addfindform', addfindform)
app.use('/getfindform', getfindform)
app.use('/searchfindform', searchfindform)
app.use('/sendMsg', sendMsg)
app.use('/getMsg', getMsg)
app.use('/deleteMsg', deleteMsg)
app.use('/postfindform', postfindform)
app.use('/getstudent', getstudent)
app.use('/poststudent', poststudent)
app.use('/getlostform', getlostform)
app.use('/postlostform', postlostform)
app.use('/addlostform', addlostform)
app.use('/postUserInfo', postUserInfo)
app.use('/getUserInfo', getUserInfo)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
