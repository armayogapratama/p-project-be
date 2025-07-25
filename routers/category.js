const {
  lists,
  create,
  destroy,
  update,
  detail,
  listWithProduct,
} = require("../controllers/category.controller");

const router = require("express").Router();

router.get("/list", lists);
router.post("/create", create);
router.get("/detail/:id", detail);
router.get("/list/:id/product", listWithProduct);
router.delete("/delete/:id", destroy);
router.put("/update/:id", update);

module.exports = router;
