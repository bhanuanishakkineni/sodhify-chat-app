import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js';
import profileRouter from './routes/profile.route.js';

const appRouter = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/message', messageRouter);
    app.use('/api/profile', profileRouter);
};

export default appRouter;