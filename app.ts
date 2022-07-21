import express, { Express } from 'express';
import config from './config';
import mongoose from 'mongoose';

const app: Express = express();
const PORT: number = config.port || 5000;


const options: object = { extended: true }

app.use(express.json(options));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/to', require('./routes/redirect.routes'));

async function start() {
  try {
    await mongoose.connect(config.mongoUri);
    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}`);
    })
  } catch (e) {
    console.log('Server error', (e as Error).message);
    process.exit(1);
  }
}

start();

