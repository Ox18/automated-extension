import express from 'express';
import Controller from '../controllers/UserController';
const router = express.Router();

router.post('/', Controller.create);

export = router;