import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { configuration } from './config/configuration';
import { userRouter } from './routes/user-route';

const app = express();
const port = configuration.PORT;

// app use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression()); // Compress all routes
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
var corsOptions = {
  origin: configuration.FRONT_END_HOST, //frontend url
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/', userRouter);

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
