import dotenv from 'dotenv';
dotenv.config();

export const auth = {
  accessKey: process.env.ACCESS_KEY,
  accessSecret: process.env.ACCESS_SECRET,
};
