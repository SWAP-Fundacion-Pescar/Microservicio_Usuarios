import express from 'express';
import MongoDB from './Infrastructure/Persistence/Config/MongoDB';
import userRouter from './Application/Routes/UserRoutes';
import requestLogger from './Application/Middleware/RequestLogger';
import errorHandler from './Application/Middleware/ErrorHandler';
import swaggerSpec from './Infrastructure/Config/Swagger';
import swaggerUi from 'swagger-ui-express';
import passport from './Infrastructure/Config/Passport';
import cors from 'cors';
MongoDB();
const app = express();
app.use(cors());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger);
app.use('/api', userRouter);
app.get('/', (req, res) => 
    {
        res.send("Up and running");
    })
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
export default app;