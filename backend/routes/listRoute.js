import express from 'express';
import { addItem, getItemsByUser } from '../controllers/listController.js';
import authMiddleware from '../middleware/auth.js';
import { upload } from '../middleware/multer.js';

const listRouter = express.Router();

// POST: Add item 
listRouter.post(
  '/add',
  authMiddleware,
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 5 },
  ]),
  addItem
);

// GET: Get all items for logged-in user
listRouter.get('/my', authMiddleware, getItemsByUser);

export default listRouter;
