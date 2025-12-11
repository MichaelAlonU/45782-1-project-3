import express, { json } from 'express'
import http from 'http'
import { Server as IOServer } from 'socket.io'
import logger from './middlewares/error/logger';
import responder from './middlewares/error/responder';
import notFound from './middlewares/not-found';
import config from 'config'
import sequelize from './db/sequelize';
import Role from './models/Role';
import cors from 'cors'
import vacationsRouter from './routers/vacations'
import followersRouter from './routers/follows'
import authRouter from './routers/auth'
import authenticate from './middlewares/authenticate';
import fileUpload from 'express-fileupload';
import mysql from "mysql2/promise";

const app = express()

const port = config.get<number>('app.port')
const appName = config.get<string>('app.name')
const secret = config.get<string>('app.secret')

console.log(`app secret is ${secret}`)

app.use(cors())
app.use(fileUpload())
app.use(json())

app.use('/auth', authRouter)
app.use(authenticate)
app.use('/vacations', vacationsRouter)
app.use('/followers', followersRouter)

// not found
app.use(notFound)

// error middlewares
app.use(logger)
app.use(responder);

async function ensureDatabaseExists() {
  const dbConfig = config.get<{
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  }>("db");

  console.log("DB HOST:", dbConfig.host);
  console.log("DB USER:", dbConfig.username);
  console.log("DB PASSWORD:", dbConfig.password);
  console.log("DB NAME:", process.env.DB_NAME);
  console.log("DB PORT:", dbConfig.port);

  const connection = await mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.username,
    password: dbConfig.password
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
  await connection.end();
}


(async () => {
  try {
    await ensureDatabaseExists();

    await sequelize.sync({
      force: process.argv.includes('force'),
      alter: process.argv.includes('alter')
    });

    await Role.bulkCreate(
      [
        { roleName: 'USER' },
        { roleName: 'ADMIN' },
      ],
      { ignoreDuplicates: true }
    );

    console.log('Roles seeded successfully');

    // Create HTTP server to support both Express and Socket.IO
    const server = http.createServer(app)

    // Attach Socket.IO to the HTTP server
    const io = new IOServer(server, {
      cors: {
        origin: '*'
      }
    })

    // Socket.IO connection handler
    io.on('connection', (socket) => {
      console.log('client connected (socket.io)')

      socket.on('vacation-like', (payload: any) => {
        io.emit('vacation-like', payload)
      })

      socket.on('disconnect', () => console.log('client disconnected (socket.io)'))
    })

    server.listen(port, () => console.log(`${appName} started on port ${port}`));

  } catch (err) {
    console.error("Startup error:", err);
  }
})();
