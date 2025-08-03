import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

let pgClient;

export const connectMongo = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// export const connectPostgres = async () => {
//   try {
//     pgClient = new Client({
//       connectionString: process.env.POSTGRES_URI,
//       ssl: process.env.NODE_ENV === 'production',
//     });
//     await pgClient.connect();
//     console.log('PostgreSQL connected');
//   } catch (err) {
//     console.error('PostgreSQL connection error:', err);
//     process.exit(1);
//   }
// };

// export const getPostgresClient = () => {
//   if (!pgClient) {
//     throw new Error('PostgreSQL client not initialized. Call connectPostgres() first.');
//   }
//   return pgClient;
// };
