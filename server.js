import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors' // used it instead try catch next error
import morgan from 'morgan'
//db and authenticateUser
import connectDB from './db/connect.js'

//routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

//middleware
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'

if (process.env.NODE_ENV !== 'production') app.use(morgan('dev')) // logger middleware function
app.use(express.json())

app.get('/',(req, res) => {
    res.json({msg: 'Welcome!'})
})
app.get('/api/v1',(req, res) => {
  res.json({msg: 'API!'})
})
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5000



const start = async () => {
    try {
    connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}...`)
    })
    .on("error", function (err) {
        process.once("SIGUSR2", function () {
          process.kill(process.pid, "SIGUSR2");
        });
        process.on("SIGINT", function () {
          // this is only called on ctrl+c, not restart
          process.kill(process.pid, "SIGINT");
        });
      });
    } catch (error) {
        console.log(error)
    }
}
start()