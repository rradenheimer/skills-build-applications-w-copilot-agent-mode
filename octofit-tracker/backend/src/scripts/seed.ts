import mongoose from 'mongoose';
import { ActivityModel, TeamModel, UserModel, WorkoutModel } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      ActivityModel.deleteMany({}),
      TeamModel.deleteMany({}),
      UserModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = await UserModel.create([
      {
        username: 'alex.runner',
        email: 'alex.runner@example.com',
        displayName: 'Alex Rivera',
        points: 185,
      },
      {
        username: 'jamie.walks',
        email: 'jamie.walks@example.com',
        displayName: 'Jamie Chen',
        points: 140,
      },
      {
        username: 'taylor.strong',
        email: 'taylor.strong@example.com',
        displayName: 'Taylor Brooks',
        points: 220,
      },
    ]);

    const activities = await ActivityModel.create([
      {
        userId: users[0]._id,
        type: 'running',
        durationMinutes: 35,
        distanceKm: 5.2,
        points: 100,
        completedAt: new Date('2026-09-08T16:30:00Z'),
      },
      {
        userId: users[0]._id,
        type: 'walking',
        durationMinutes: 25,
        distanceKm: 2.1,
        points: 85,
        completedAt: new Date('2026-09-10T16:30:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'walking',
        durationMinutes: 40,
        distanceKm: 3.4,
        points: 140,
        completedAt: new Date('2026-09-09T15:00:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'strength',
        durationMinutes: 45,
        points: 120,
        completedAt: new Date('2026-09-10T17:00:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'running',
        durationMinutes: 30,
        distanceKm: 4.6,
        points: 100,
        completedAt: new Date('2026-09-11T16:00:00Z'),
      },
    ]);

    const teams = await TeamModel.create([
      {
        name: 'Trail Blazers',
        description: 'A team focused on consistent outdoor movement.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Power Hour',
        description: 'Strength and conditioning enthusiasts.',
        members: [users[2]._id],
      },
    ]);

    const workouts = await WorkoutModel.create([
      {
        title: 'Fresh Start Walk',
        description: 'A low-impact walk to build a consistent movement habit.',
        difficulty: 'beginner',
        activities: ['10-minute warm-up', '30-minute brisk walk', '5-minute cool-down'],
      },
      {
        title: 'Interval Builder',
        description: 'Alternate running and walking to improve cardiovascular fitness.',
        difficulty: 'intermediate',
        activities: ['5-minute warm-up', '6 x 2-minute run', '2-minute walk between intervals', '5-minute cool-down'],
      },
      {
        title: 'Full-Body Circuit',
        description: 'A challenging circuit using bodyweight strength movements.',
        difficulty: 'advanced',
        activities: ['Squats', 'Push-ups', 'Lunges', 'Plank', 'Burpees'],
      },
    ]);

    console.log(
      `Database seeding complete: ${users.length} users, ${activities.length} activities, ${teams.length} teams, ${workouts.length} workouts`,
    );
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
