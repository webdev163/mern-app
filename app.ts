import express, { Express } from 'express';
import config from './config';
import mongoose from 'mongoose';
import path from 'path';

const app: Express = express();
const PORT: number = config.port || 5000;


const options: object = { extended: true }

app.use(express.json(options));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/to', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

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

