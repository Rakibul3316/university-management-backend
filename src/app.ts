import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
// import ApiError from './errors/ApiError'

// Routes
import { UserRoutes } from './app/modules/user/user.route'

const app: Application = express()

app.use(cors())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// User Route
app.use('/api/v1/users', UserRoutes)

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('error logger')
// })

// Global Error Handler
app.use(globalErrorHandler)

export default app
