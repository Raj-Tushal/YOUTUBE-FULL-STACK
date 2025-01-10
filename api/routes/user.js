import express from 'express';
import {update,deleteUser, subscribe, Like, dislike, unsubsrcibe, getUser} from '../Controllers/user.js';
import verifyToken from '../verifyToken.js';
const router = express.Router()

// update a user
router.put('/:id',verifyToken,update)

// delete a user
router.delete('/:id',verifyToken,deleteUser)

// get a user
router.get('/find/:id',getUser)

// subscribe a user
router.put('/sub/:userId/:khudKiId',subscribe)

// unsubsrcibe a user
router.put('/unsub/:userId/:khudKiId',unsubsrcibe)

// like a user
router.put('/like/:videoId/:userId',Like)

// dislike a user
router.put('/dislike/:videoId/:userId',dislike)
export  default router;