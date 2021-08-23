import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/posts', require('./posts'));
router.use('/user', require('./user'));

export = router;