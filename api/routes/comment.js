import express from 'express';
import { addComment, deleteComment, getComment } from '../Controllers/comment.js';
import verifyToken from '../verifyToken.js';
const router = express.Router()

router.post('/:userId',addComment)
router.delete('/:id',verifyToken,deleteComment)
router.get('/getAll/:id',getComment)
export  default router;