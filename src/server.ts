import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'

async function connectDB() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database connection successful.')
    // Listening app
    app.listen(config.port, () => {
      logger.info(`Servier is listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect database', error)
  }
}

connectDB()
