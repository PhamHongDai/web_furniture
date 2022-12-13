const express = require('express');
const { addCategory, getCategories, setDisableCategory, updateCategories, getCategoryDisabled } = require('../controllers/category');
const { requireSignin, adminMiddleware, uploadCloud } = require('../common-middleware');
const router = express.Router();

router.post('/add', requireSignin, adminMiddleware, uploadCloud.single("categoryImage"), addCategory);
router.get('/getCategories', getCategories);
router.get('/getCategoriesDisable', getCategoryDisabled);
router.post('/setDisable', requireSignin, adminMiddleware, setDisableCategory)
router.post('/update', requireSignin, adminMiddleware, uploadCloud.single("categoryImage"), updateCategories)

module.exports = router;
