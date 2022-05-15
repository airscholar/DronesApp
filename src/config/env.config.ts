import * as env from 'env-var';
import { config } from 'dotenv';

config();

const PORT = env.get('PORT').asInt();
const NODE_ENV = env.get('NODE_ENV').asString();
const DATABASE_URL = env.get('DATABASE_URL').asString() || '';
const DATABASE_TYPE = env.get('DATABASE_TYPE').asString() || 'postgres';
const JWT_SECRET = env.get('JWT_SECRET').asString();

const serverConfig = {
  NODE_ENV,
  PORT,
  DATABASE_URL,
  DATABASE_TYPE,
  JWT_SECRET,
};

export default serverConfig;
