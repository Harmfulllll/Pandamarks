import express from 'express';
import verify from '../middleware/verify.middleware.js';
import { addTags, createBokmark, deleteBookmark, getBookmarks } from '../controllers/bookmarks.controller.js';

const router=express.Router();

router.post('/add',verify, createBokmark);

router.delete('/:bookmarkid',verify, deleteBookmark);

router.get('/get',verify, getBookmarks);

router.post('/tags/:bookmarkid',verify, addTags);

export default router;