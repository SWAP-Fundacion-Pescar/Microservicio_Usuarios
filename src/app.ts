import express from 'express';
import MongoDB from './Infrastructure/Persistence/Config/MongoDB';
import userRouter from './Application/Routes/UserRoutes';
MongoDB();
const app = express();
app.use(express.json());
app.use('/api', userRouter);
export default app;