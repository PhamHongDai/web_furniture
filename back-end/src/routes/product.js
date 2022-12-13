const express = require("express");
const {
  addProduct,
  addProducts,
  getProductsByCategorySlug,
  getProductById,
  getProductDetailsBySlug,
  setDisableProduct,
  getProducts,
  updateProduct,
  updateQty,
  updateVariants,
  searchByProductName,
  getListProductByIds,
  addProductReview,
} = require("../controllers/product");
const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
  uploadCloud,
} = require("../common-middleware");
const router = express.Router();

router.post(
  "/add",
  requireSignin,
  adminMiddleware,
  uploadCloud.array("productPicture"),
  addProduct
);
router.post("/addProducts", addProducts);
router.get("/:slug/category", getProductsByCategorySlug);
router.get("/:slug", getProductDetailsBySlug);
router.post("/searchByProductName", searchByProductName);
router.post("/getById", getProductById);
router.post(
  "/setDisableProduct",
  requireSignin,
  adminMiddleware, setDisableProduct
);
router.post("/getProducts", getProducts);
router.post("/update", requireSignin, adminMiddleware, updateProduct);
router.post("/updateQty", requireSignin, adminMiddleware, updateQty);
router.post("/updateVariants", requireSignin, adminMiddleware, updateVariants);
router.post(
  "/addProductReview",
  requireSignin,
  userMiddleware,
  addProductReview
);
router.post("/getListProductByIds", getListProductByIds);

module.exports = router;
