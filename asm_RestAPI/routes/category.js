const express = require("express");
const router = express.Router();
const Category = require("../models/category");

router.get("/", async (req, res) => {
    res.json(await Category.find());
});

router.post("/add", async (req, res) => {
    const cate = new Category(req.body);
    await cate.save();
    res.json({ message: "Add Category OK" });
});

module.exports = router;
