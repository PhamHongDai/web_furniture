const express = require("express");
const {
  addProduct,
  getProductsByCategorySlug,
  getProductDetailsBySlug,
  setDisableProduct,
  getProducts,
  updateProduct,
  getProductsDisable,
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
router.get("/:slug/category", getProductsByCategorySlug);
router.get("/:slug", getProductDetailsBySlug);
router.post("/searchByProductName", searchByProductName);
router.post(
  "/setDisableProduct",
  requireSignin,
  adminMiddleware, setDisableProduct
);
router.post("/getProducts", getProducts);
router.post("/getProductsDisable", getProductsDisable);

router.post("/update", requireSignin, adminMiddleware, uploadCloud.array("productPicture"), updateProduct);
router.post("/updateVariants", requireSignin, adminMiddleware, updateVariants);
router.post(
  "/addProductReview",
  requireSignin,
  userMiddleware,
  addProductReview
);
router.post("/getListProductByIds", getListProductByIds);

module.exports = router;
