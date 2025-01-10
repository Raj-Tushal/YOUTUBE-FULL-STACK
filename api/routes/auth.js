import express from 'express';
import {  googleAuth, signIn, signUp } from '../Controllers/auth.js';
const router = express.Router()

//signUp
router.post('/sigUp',signUp)

//signIn
router.post('/sigIn',signIn)

router.post('/google',googleAuth)

export  default router;