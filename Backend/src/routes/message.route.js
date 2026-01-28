import express from 'express';

const router = express.Router();

router.post('/send', (req, res) => {
    res.status(200).json({ message: 'Send message route' });
});

export default router;