import express from 'express';
import askAiController from '../controllers/askAi.controller.js';

const router = express.Router();

router.post('/ask-ai', askAiController);

export default router;
