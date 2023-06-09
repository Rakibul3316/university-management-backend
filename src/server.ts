import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'
import { Server } from 'http'

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM is received.')
//   if (server) {
//     server.close()
//   }
// })

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

let server: Server

async function connectDB() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database connection successful.')
    // Listening app
    server = app.listen(config.port, () => {
      logger.info(`Servier is listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect database', error)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

connectDB()
