var express = require("express");
var router = express.Router();
var Product = require("../models/product");


// 1. Thêm sản phẩm

router.post("/add-product", async function (req, res) {
    try {
        const { ProductID, ProductName, Description, Price, CateID } = req.body;

        const newProduct = {
            ProductID,
            ProductName,
            Description,
            Price,
            CateID
        };

        await Product.create(newProduct);

        res.status(201).json({
            status: true,
            message: "Thêm sản phẩm thành công"
        });

    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: false,
            message: "Thêm sản phẩm thất bại"
        });
    }
});


// 2. Cập nhật sản phẩm
router.put("/update-product", async function (req, res) {
    try {
        const { id, ProductName, Description, Price, CateID } = req.body;

        const item = await Product.findOne({ ProductID: id });

        if (!item) {
            return res.status(404).json({
                status: false,
                message: "Không tìm thấy sản phẩm"
            });
        }

        item.ProductName = ProductName ?? item.ProductName;
        item.Description = Description ?? item.Description;
        item.Price = Price ?? item.Price;
        item.CateID = CateID ?? item.CateID;

        await item.save();

        res.status(200).json({
            status: true,
            message: "Cập nhật sản phẩm thành công"
        });

    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: false,
            message: "Cập nhật sản phẩm thất bại"
        });
    }
});

// ===============================
// 3. Xóa sản phẩm theo query ?id=...
// DELETE: localhost:5000/api/product/delete-product?id=P1
// ===============================
router.delete("/delete-product", async function (req, res) {
    try {
        const { id } = req.query;

        const item = await Product.findOne({ ProductID: id });

        if (!item) {
            return res.status(404).json({
                status: false,
                message: "Không tìm thấy sản phẩm"
            });
        }

        await Product.deleteOne({ ProductID: id });

        res.status(200).json({
            status: true,
            message: "Xóa sản phẩm thành công"
        });

    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: false,
            message: "Xóa thất bại"
        });
    }
});

// 4. Lấy tất cả sản phẩm
router.get("/all", async function (req, res) {
    try {
        const list = await Product.find();
        res.status(200).json({
            status: true,
            data: list
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: false,
            message: "Lỗi khi lấy danh sách"
        });
    }
});

// 5. Tìm sản phẩm theo tên (search)

router.get("/search", async function (req, res) {
    try {
        const q = req.query.q;

        const list = await Product.find({
            ProductName: { $regex: q, $options: "i" }
        });

        res.json({
            status: true,
            data: list
        });

    } catch (e) {
        console.log(e);
        res.status(400).json({ status: false, message: "Tìm kiếm thất bại" });
    }
});

// 6. Lấy chi tiết sản phẩm

router.get("/detail/:pid", async function (req, res) {
    try {
        const item = await Product.findOne({ ProductID: req.params.pid });

        res.json({
            status: true,
            data: item
        });

    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: false,
            message: "Không thể lấy chi tiết"
        });
    }
});

module.exports = router;
