const router = require("express").Router();

router.use("/api/user", require("./user"));
router.use("/api/category", require("./category"));
router.use("/api/product", require("./product"));

module.exports = router;
