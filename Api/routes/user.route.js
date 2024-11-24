import express from 'express';
import { test,updateUser } from '../controller/user.controller.js';
import { verifyToken } from '../utills/verifyUser.js';
const router = express.Router();

router.get('/test', test);
router.post('/update/:id',verifyToken, updateUser)
//router.delete('/delete/:id', deleteUser)
//router.get('/listings/:id', getUserListings)
//router.get('/:id', getUser)

export default router; 