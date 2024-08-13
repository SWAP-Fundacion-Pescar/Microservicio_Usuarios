import express from 'express';
import MongoDB from './Infrastructure/Persistence/Config/MongoDB';
import userRouter from './Application/Routes/UserRoutes';
import requestLogger from './Application/Middleware/RequestLogger';
import errorHandler from './Application/Middleware/ErrorHandler';
import swaggerSpec from './Infrastructure/Config/Swagger';
import swaggerUi from 'swagger-ui-express';
import passport from './Infrastructure/Config/Passport';
import { extractToken } from './Application/Middleware/ExtractToken';
MongoDB();
const app = express();




app.use(passport.initialize());
app.use(express.json());
app.use(requestLogger);
app.use(extractToken);
app.use('/api', userRouter);
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
export default app;