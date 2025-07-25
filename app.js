const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const router = require("./routers/main");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
