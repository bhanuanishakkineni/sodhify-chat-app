import express from 'express';

const router = express.Router();

router.post('/signup', (req, res) => {
    res.status(200).json({ message: 'Signup route' });
});

router.post('/signin', (req, res) => {
    res.status(200).json({ message: 'Signin route' });
});

export default router;