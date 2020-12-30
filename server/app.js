import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

//Routes
import postsRoutes from './routes/api/post';
import userRoutes from './routes/api/user';
import authRoutes from './routes/api/auth';


const app = express();
const {MONGO_URI} = config;

//server의 보안적인 측면 보완해주는 라이브러리 사용
app.use(hpp());
app.use(helmet());

//cors 설정
//모두 허용
app.use(cors({origin: true, credentials: true}));
//개발시 로그 확인 가능하도록
app.use(morgan("dev"));

//json형태로 브라우저에서 서버로 보내면, express에서 json형태 body를 해석해줌.
app.use(express.json());




mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => console.log("MONGO DB CONNECTED!!!"))
.catch((e) => console.log(e));


//use routes
app.get('/');
app.use('/api/post', postsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);


export default app;