import { RequestHandler, Router } from 'express'
import { ActivityModel, TeamModel, UserModel, WorkoutModel } from './models.js'

const router = Router()
const ADMIN_ROLE = 'admin'

const requireAuthenticatedUser: RequestHandler = (request, response, next) => {
  const userId = request.header('x-user-id')
  if (!userId) {
    response.status(401).json({ error: 'Authentication required' })
    return
  }
  next()
}

const requireAdminRole: RequestHandler = (request, response, next) => {
  const role = request.header('x-user-role')?.toLowerCase()
  if (role !== ADMIN_ROLE) {
    response.status(403).json({ error: 'Admin role required' })
    return
  }
  next()
}

const requireActivityOwnershipOrAdmin: RequestHandler = (request, response, next) => {
  const userId = request.header('x-user-id')
  if (!userId) {
    response.status(401).json({ error: 'Authentication required' })
    return
  }

  const role = request.header('x-user-role')?.toLowerCase()
  if (role === ADMIN_ROLE) {
    next()
    return
  }

  const activityUserId = request.body?.userId
  const requestedUserId =
    typeof activityUserId === 'string'
      ? activityUserId
      : activityUserId?.toString?.()

  if (!requestedUserId || requestedUserId !== userId) {
    response.status(403).json({ error: 'Cannot create activity for another user' })
    return
  }

  next()
}

router.get('/users', async (_request, response) => {
  response.json(await UserModel.find().sort({ username: 1 }))
})

router.post('/users', requireAuthenticatedUser, requireAdminRole, async (request, response) => {
  const user = await UserModel.create(request.body)
  response.status(201).json(user)
})

router.get('/activities', async (request, response) => {
  const filter: Record<string, string> = {}
  if (typeof request.query.userId === 'string') {
    filter.userId = request.query.userId
  }
  response.json(await ActivityModel.find(filter).populate('userId', 'username displayName').sort({ completedAt: -1 }))
})

router.post('/activities', requireAuthenticatedUser, requireActivityOwnershipOrAdmin, async (request, response) => {
  const activity = await ActivityModel.create(request.body)
  if (activity.userId) {
    await UserModel.findByIdAndUpdate(activity.userId, { $inc: { points: activity.points } })
  }
  response.status(201).json(activity)
})

router.get('/teams', async (_request, response) => {
  response.json(await TeamModel.find().populate('members', 'username displayName').sort({ name: 1 }))
})

router.post('/teams', requireAuthenticatedUser, requireAdminRole, async (request, response) => {
  const team = await TeamModel.create(request.body)
  response.status(201).json(team)
})

router.get('/leaderboard', async (_request, response) => {
  response.json(await UserModel.find().select('username displayName points').sort({ points: -1, username: 1 }))
})

router.get('/workouts', async (request, response) => {
  const filter: Record<string, string> = {}
  if (typeof request.query.difficulty === 'string') {
    filter.difficulty = request.query.difficulty
  }
  response.json(await WorkoutModel.find(filter).sort({ title: 1 }))
})

router.post('/workouts', requireAuthenticatedUser, requireAdminRole, async (request, response) => {
  const workout = await WorkoutModel.create(request.body)
  response.status(201).json(workout)
})

export default router