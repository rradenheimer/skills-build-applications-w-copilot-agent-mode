import mongoose, { Schema, Types } from 'mongoose'

export interface User {
  username: string
  email: string
  displayName: string
  points: number
}

export interface Activity {
  userId: Types.ObjectId
  type: 'running' | 'walking' | 'strength'
  durationMinutes: number
  distanceKm?: number
  points: number
  completedAt: Date
}

export interface Team {
  name: string
  description?: string
  members: Types.ObjectId[]
}

export interface Workout {
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  activities: string[]
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    displayName: { type: String, required: true, trim: true },
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
)

const activitySchema = new Schema<Activity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'walking', 'strength'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
)

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    activities: [{ type: String, trim: true }],
  },
  { timestamps: true },
)

export const UserModel = mongoose.model<User>('User', userSchema)
export const ActivityModel = mongoose.model<Activity>('Activity', activitySchema)
export const TeamModel = mongoose.model<Team>('Team', teamSchema)
export const WorkoutModel = mongoose.model<Workout>('Workout', workoutSchema)