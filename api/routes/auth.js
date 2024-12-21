import express from 'express';
import {  signIn, signUp } from '../Controllers/auth.js';
const router = express.Router()

//signUp
router.post('/sigUp',signUp)

//signIn
router.get('/sigIn',signIn)

export  default router;