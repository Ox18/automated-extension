import express from 'express';
import Controller from '../controllers/UserController';
const router = express.Router();

router.post('/createAll', Controller.createUsers);
router.post('/deleteAll', Controller.deleteAll);
router.post('/activeUser/:id', Controller.activeUser);
router.get('/get', Controller.getUser);
router.get('/getCount', Controller.getCount);

export = router;