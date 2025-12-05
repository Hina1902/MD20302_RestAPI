var express = require("express");
var router = express.Router();
var Account = require("../models/account");

// Đăng ký tài khoản
router.post("/register", async function (req, res) {
    try {
        const { Email, Password, FullName } = req.body;

        const check = await Account.findOne({ Email });

        if (check) {
            return res.status(400).json({
                status: false,
                message: "Email đã tồn tại"
            });
        }

        await Account.create({
            Email,
            Password,
            FullName
        });

        res.status(201).json({
            status: true,
            message: "Đăng ký thành công"
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({ status: false, message: "Lỗi server" });
    }
});

// Đăng nhập
router.post("/login", async function (req, res) {
    try {
        const { Email, Password } = req.body;

        const user = await Account.findOne({ Email, Password });

        if (!user) {
            return res.status(400).json({
                status: false,
                message: "Sai email hoặc mật khẩu"
            });
        }

        res.json({
            status: true,
            message: "Đăng nhập thành công",
            data: user
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({ status: false, message: "Lỗi server" });
    }
});

// Cập nhật thông tin
router.put("/update/:email", async function (req, res) {
    try {
        await Account.updateOne({ Email: req.params.email }, req.body);

        res.json({ status: true, message: "Cập nhật thành công" });

    } catch (e) {
        res.status(500).json({ status: false, message: "Cập nhật thất bại" });
    }
});

module.exports = router;
