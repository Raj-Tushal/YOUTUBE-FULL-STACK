import express from 'express';
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from '../Controllers/video.js';
import verifyToken from '../verifyToken.js'
import multer from 'multer'
import upload from '../services/upload.js';


const router = express.Router()
// create a video
router.post('/', upload.fields([{ name: 'thumbnail' }, { name: 'video' }]),verifyToken, addVideo)
router.put('/:id',verifyToken,updateVideo)
router.delete('/',verifyToken,deleteVideo)
router.get('/find/:id',getVideo)
router.put('/view/:videoId',addView)
router.get('/random',random)
router.get('/trend',trend)
router.get('/sub',verifyToken,sub)
router.get('/tags',getByTag)
router.get('/search',search)


export  default router;