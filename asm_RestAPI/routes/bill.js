var express = require("express");
var router = express.Router();
var Bill = require("../models/bill");
var BillDetails = require("../models/billdetails");

// Thêm sản phẩm vào giỏ hàng
router.post("/cart/add", async function (req, res) {
    try {
        await BillDetails.create({
            BillID: null,
            ProductID: req.body.ProductID,
            Quantity: req.body.Quantity
        });

        res.json({ status: true, message: "Đã thêm vào giỏ hàng" });

    } catch (e) {
        res.status(500).json({ status: false, message: "Thêm thất bại" });
    }
});

// Xem giỏ hàng
router.get("/cart", async function (req, res) {
    try {
        const list = await BillDetails.find({ BillID: null });
        res.json({ status: true, data: list });
    } catch (e) {
        res.status(500).json({ status: false, message: "Lỗi server" });
    }
});

// Đặt hàng
router.post("/order", async function (req, res) {
    try {
        const BillID = "BILL" + Date.now();

        await Bill.create({
            BillID,
            Email: req.body.Email,
            Date: new Date()
        });

        await BillDetails.updateMany({ BillID: null }, { BillID });

        res.json({ status: true, message: "Đặt hàng thành công", BillID });

    } catch (e) {
        res.status(500).json({ status: false, message: "Đặt hàng thất bại" });
    }
});

// Lịch sử đơn hàng
router.get("/history/:email", async function (req, res) {
    try {
        const list = await Bill.find({ Email: req.params.email });
        res.json({ status: true, data: list });
    } catch (e) {
        res.status(500).json({ status: false, message: "Lỗi server" });
    }
});

module.exports = router;
