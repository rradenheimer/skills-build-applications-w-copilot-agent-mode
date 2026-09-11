import express, { ErrorRequestHandler } from 'express'
import routes from './routes.js'

const app = express()

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api' })
})

app.use('/api', routes)

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error(error)
  response.status(400).json({ error: 'Request could not be completed' })
}

app.use(errorHandler)

export default app