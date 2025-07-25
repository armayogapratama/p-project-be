const multer = require("multer");
const { lists, detail, create } = require("../controllers/product.controller");

const router = require("express").Router();

router.get("/lists", lists);
router.get("/detail/:id", detail);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/create",
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  create
);

module.exports = router;
