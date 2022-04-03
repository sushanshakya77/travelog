import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';
import '../src/app/config/database';
import users from '../src/app/routes/usersRoute';
import userInfo from '../src/app/routes/userInfo';
import destination from '../src/app/routes/destination';
import subdestination from '../src/app/routes/subDestination';
import post from '../src/app/routes/post';
import trip from '../src/app/routes/trip';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const sess: session.SessionOptions = {
  secret: process.env.SESSION_SECRET as string,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 30000000000 },
};

app.use(session(sess));
app.use('/api/auth', users);
app.use('/api/userInfo', userInfo);
app.use('/api/destinations', destination);
app.use('/api/subDestinations', subdestination);
app.use('/api/post', post);
app.use('/api/trip', trip);

// app.use('/images', express.static(path.join(__dirname, 'public/images')));
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
// app.post('/api/upload', upload.single('file'), (req, res) => {
//   try {
//     return res.status(200).json('File uploded successfully');
//   } catch (error) {
//     console.error(error);
//   }
// });

// app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, '..', '/client')));

const port = 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
