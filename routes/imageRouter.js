var express = require("express");
var router = express.Router();
var imageModel = require("../models/Image");

// Thêm ảnh
// POST: localhost:3000/image/add-image
router.post("/add-image", async function (req, res) {
    try {
        const { link, productID } = req.body;

        await imageModel.create({ link, productID });

        res.status(201).json({ status: true, message: "Thêm ảnh thành công" });

    } catch (e) {
        console.log(e);
        res.status(400).json({ status: false, message: "Thêm ảnh thất bại" });
    }
});

// Cập nhật ảnh
// PUT: localhost:3000/image/update-image
router.put("/update-image", async function (req, res) {
    const { id, link, productID } = req.body;

    try {
        const item = await imageModel.findById(id);

        if (!item) {
            return res.status(404).json({ status: false, message: "Không tìm thấy ảnh" });
        }

        item.link = link ?? item.link;
        item.productID = productID ?? item.productID;

        await item.save();

        res.status(200).json({ status: true, message: "Cập nhật thành công" });

    } catch (e) {
        console.log(e);
        res.status(400).json({ status: false, message: "Cập nhật thất bại" });
    }
});

// Xóa ảnh theo query
router.delete("/delete-image", async function (req, res) {
    const { id } = req.query;

    try {
        const item = await imageModel.findById(id);

        if (!item) {
            return res.status(404).json({ status: false, message: "Không tìm thấy ảnh" });
        }

        await imageModel.findByIdAndDelete(id);

        res.status(200).json({ status: true, message: "Xóa thành công" });

    } catch (e) {
        console.log(e);
        res.status(400).json({ status: false, message: "Xóa thất bại" });
    }
});

// Xóa ảnh theo params
router.delete("/delete-image-2/:id", async function (req, res) {
    const { id } = req.params;

    try {
        const item = await imageModel.findById(id);

        if (!item) {
            return res.status(404).json({ status: false, message: "Không tìm thấy ảnh" });
        }

        await imageModel.findByIdAndDelete(id);

        res.status(200).json({ status: true, message: "Xóa thành công" });

    } catch (e) {
        console.log(e);
        res.status(400).json({ status: false, message: "Xóa thất bại" });
    }
});

module.exports = router;
