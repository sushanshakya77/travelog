import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';
import '../src/app/config/database';
import users from '../src/app/routes/usersRoute';
import { jwtConstants } from './app/constants/constants';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const sess: session.SessionOptions = {
  secret: jwtConstants.SESSION_SECRET as string,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 30000000000 },
};

app.use(session(sess));
app.use('/api/auth', users);

const port = 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
