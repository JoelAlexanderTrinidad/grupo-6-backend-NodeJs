const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const indexRouter = require('./routes/index')
const transactionsRouter = require('./routes/transactions')

swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

const port = process.env.PORT || 3000

const app = express()

app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/transactions', transactionsRouter)

// inicio swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ultra Wallet Documentation",
      version: "0.1.0",
      description: "Ultra Wallet tu wallet rapida segura y economica",
      license: {
        name: "alkemy G6",
        url: "https://trello.com/b/u2xLPJqn/grupo6-backend-nodejs-alkemy",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",  // avisar de el token en el name
          in: "header",
          name: "x-access-token",
        },
      },
    },
  },
  apis: [
    "./routes/categories.js",
    "./routes/transactions.js",
    "./routes/users.js",
  ],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
 //fin swagger

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor funcionando en el puerto ${port}`)
})

module.exports = app
