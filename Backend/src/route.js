import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js';

const appRouter = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/message', messageRouter);
};

export default appRouter;