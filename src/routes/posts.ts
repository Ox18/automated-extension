import express from 'express';
import Controller from '../controllers/PostController';
const router = express.Router();

/**
 * @swagger
 * /posts:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', Controller.getPosts);

export = router;