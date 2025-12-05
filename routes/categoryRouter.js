var express = require("express");
var router = express.Router();
var categoryRouters = require("../models/category")

//post: thêm, push: cập nhật, delete: xóa, get:lấy
//Thêm mới danh mục
//localhost:3000/danh mục/add-category
//localhost:3000/add
router.post("/add-category", async function (req, res) {
    try { // <-- Bắt đầu try
        const { cateName, parentID } = req.body;
        const newCate = { cateName, parentID };
        await categoryRouters.create(newCate);
        res.status(201).json({ status: true, message: "Thêm danh mục thành công" }); // Nên dùng 201 Created
    } catch (e) { // <-- Kết thúc catch bên trong hàm
        console.error(e);
        // Khi lỗi, nên trả về status 400 (Bad Request) hoặc 500 (Server Error)
        res.status(400).json({ status: false, message: "Thêm danh mục thất bại" });
    }
});

router.put("/update-category", async function (req, res) {
    const { id, cateName, parentID } = req.body;
    const item = await categoryRouters.findById(id);
    // cách 2
    //const item2 = await categoryRouter.find({cateName:name});

    if (item) {
        //update
        item.cateName = cateName ? cateName : item.cateName;
        item.parentID = parentID ? parentID : item.parentID;
        await item.save();
        res.status(200).json({ status: false, message: "cập nhật thành công" })
    } else {
        res.status(200).json({ status: false, message: "ko tìm thấy" });

    }

});


//localhost:3000/category/delete-category?id=giá trị id
router.delete("/delete-category", async function (req, res) {
    const { id } = req.query;
    const item = await categoryRouters.findById(id);
    // cách 2
    //const item2 = await categoryRouter.find({cateName:name});

    if (item) {
        //
        await categoryRouters.findByIdAndDelete(id);
        res.status(200).json({ status: false, message: "xóa thành công" })
    } else {
        res.status(200).json({ status: false, message: "ko tìm thấy" });

    }

});
//localhost:3000/category/delete-category/abcd/xyz/1234
router.delete("/delete-category-2/:id", async function (req, res) {
    const { id } = req.params;
    const item = await categoryRouters.findById(id);
    // cách 2
    //const item2 = await categoryRouter.find({cateName:name});

    if (item) {
        //
        await categoryRouters.findByIdAndDelete(id);
        res.status(200).json({ status: false, message: "xóa thành công" })
    } else {
        res.status(200).json({ status: false, message: "ko tìm thấy" });

    }

});

module.exports = router;