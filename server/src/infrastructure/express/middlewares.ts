import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import express from 'express'
import compression from 'compression'

import { MEGABYTES_TO_BYTES } from '../../utils/converter'

morgan.token('process_id', () => process.pid.toString())

const middlewares = [
  cors(),
  helmet(),
  compression(),
  express.json({ limit: MEGABYTES_TO_BYTES(100) }),
  express.urlencoded({ limit: MEGABYTES_TO_BYTES(100), extended: true }),
  // morgan(':method :url :status :response-time ms - :res[content-length] :process_id'),
]

export default middlewares
