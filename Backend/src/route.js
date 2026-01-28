import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

const appRouter = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/message', messageRoutes);
};

export default appRouter;