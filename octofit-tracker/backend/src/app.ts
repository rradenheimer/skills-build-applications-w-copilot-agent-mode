import express, { ErrorRequestHandler } from 'express'
import routes from './routes.js'

const app = express()
const codespaceName = process.env.CODESPACE_NAME
const allowedOrigins = [
  'http://localhost:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : [])
]

app.use(express.json())
app.use((request, response, next) => {
  const origin = request.headers.origin

  if (origin && allowedOrigins.includes(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
  }

  response.setHeader('Vary', 'Origin')
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (request.method === 'OPTIONS') {
    response.sendStatus(204)
    return
  }

  next()
})

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