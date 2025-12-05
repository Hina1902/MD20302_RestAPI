var express = require("express");
var router = express.Router();
var productModel = require("../models/product");
var upload = require("../utils/upload");
var sendMail = require("../utils/mail");
const { response } = require("../app");

// Thêm sản phẩm
// POST: localhost:3000/product/add-product
router.post("/add-product", async function (req, res) {
    try {
        const { name, description, price, quantity, stats, CateID } = req.body;

        const newProduct = {
            name,
            description,
            price,
            quantity,
            stats,
            createAt: new Date(),
            updateAt: new Date(),
            CateID
        };

        await productModel.create(newProduct);

        res.status(201).json({
            status: true,
            message: "Thêm sản phẩm thành công"
        });

    } catch (e) {
        console.log(e);
        res.status(400).json({ status: false, message: "Thêm sản phẩm thất bại" });
    }
});

// Cập nhật sản phẩm
// PUT: localhost:3000/product/update-product
router.put("/update-product", async function (req, res) {
    try {
        const { id, name, description, price, quantity, stats, CateID } = req.body;

        const item = await productModel.findById(id);

        if (!item) {
            return res.status(404).json({ status: false, message: "Không tìm thấy sản phẩm" });
        }

        // Update nếu có truyền vào
        item.name = name ?? item.name;
        item.description = description ?? item.description;
        item.price = price ?? item.price;
        item.quantity = quantity ?? item.quantity;
        item.stats = stats ?? item.stats;
        item.CateID = CateID ?? item.CateID;
        item.updateAt = new Date();

        await item.save();

        res.status(200).json({ status: true, message: "Cập nhật thành công" });

    } catch (e) {
        console.log(e);
        res.status(400).json({ status: false, message: "Cập nhật thất bại" });
    }
});

// Xóa sản phẩm theo query ?id=...
// DELETE: localhost:3000/product/delete-product?id=123
router.delete("/delete-product", async function (req, res) {
    try {
        const { id } = req.query;

        const item = await productModel.findById(id);

        if (!item) {
            return res.status(404).json({ status: false, message: "Không tìm thấy sản phẩm" });
        }

        await productModel.findByIdAndDelete(id);

        res.status(200).json({ status: true, message: "Xóa thành công" });

    } catch (e) {
        console.log(e);
        res.status(400).json({ status: false, message: "Xóa thất bại" });
    }
});

// Xóa sản phẩm theo params /delete-product-2/:id
router.delete("/delete-product-2/:id", async function (req, res) {
    try {
        const { id } = req.params;

        const item = await productModel.findById(id);

        if (!item) {
            return res.status(404).json({ status: false, message: "Không tìm thấy sản phẩm" });
        }

        await productModel.findByIdAndDelete(id);

        res.status(200).json({ status: true, message: "Xóa thành công" });

    } catch (e) {
        console.log(e);
        res.status(400).json({ status: false, message: "Xóa thất bại" });
    }
});
//lấy toàn bộ danh sách sản phẩm có trong db
router.get("/all", async function (req, res) {
    const list = await productModel.find();
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//1.Lọc danh sách sản phẩm có giá lớn hơn 50,000.
router.get("/filter/price-gt-50k", async function (req, res) {
    const list = await productModel.find({ price: { $gt: 50000 } });
    res.json({ status: true, data: list });
});
// 2.Lọc danh sách sản phẩm có số lượng nhỏ hơn 10.
router.get("/filter/quantity-lt-10", async function (req, res) {
    const list = await productModel.find({ quantity: { $lt: 10 } });
    res.json({ status: true, data: list });
});
// 3.Tìm sản phẩm có name chứa từ khóa “socola”.
router.get("/filter/name", async (req, res) => {
    const { key } = req.query;

    const list = await productModel.find({
        name: { $regex: key, $options: "i" }
    });

    res.json({ status: true, data: list });
});

// 4.Sắp xếp sản phẩm theo giá tăng dần.
router.get("/sort/price-asc", async function (req, res) {
    const list = await productModel.find().sort({ price: 1 });
    res.json({ status: true, data: list });
});
// 5.Lấy 3 sản phẩm có giá cao nhất.
router.get("/top3-price", async function (req, res) {
    const list = await productModel.find().sort({ price: -1 }).limit(3);
    res.json({ status: true, data: list });
});
// 6.Lấy 5 sản phẩm có số lượng nhiều nhất.
router.get("/top5-quantity", async function (req, res) {
    const list = await productModel.find().sort({ quantity: -1 }).limit(5);
    res.json({ status: true, data: list });
});

// 7.Lấy danh sách sản phẩm được tạo trong ngày hôm nay (dựa vào createAt).

// 8.Lọc sản phẩm có giá nằm trong khoảng từ 20,000 đến 100,000.
router.get("/filter/price-range", async function (req, res) {
    const list = await productModel.find({
        price: { $gte: 20000, $lte: 100000 }
    });

    res.json({ status: true, data: list });
});
// 9.Lấy danh sách sản phẩm có tên bắt đầu bằng chữ “Bánh”.
router.get("/filter/name-start-banh", async function (req, res) {
    const list = await productModel.find({
        name: /^Bánh/i
    });

    res.json({ status: true, data: list });
});
// 10.Tìm sản phẩm theo nhiều điều kiện: giá < 100,000 và quantity > 20.
router.get("/filter/multi-condition", async function (req, res) {
    const list = await productModel.find({
        price: { $lt: 100000 }, quantity: { $gt: 20 }
    });

    res.json({ status: true, data: list });
});

// 11.Lấy danh sách sản phẩm có giá < 100,000 và status = true, đồng thời sắp xếp theo giá giảm dần.
router.get("/filter/price-status", async function (req, res) {
    const list = await productModel.find({ price: { $lt: 100000 }, stats: true }).sort({ price: -1 });

    res.json({ status: true, data: list });
});

// 12.Lấy sản phẩm có quantity nằm trong khoảng từ 10 đến 30 và name chứa từ “bánh”.
router.get("/filter/complex", async function (req, res) {
    const list = await productModel.find({
        quantity: { $gte: 10, $lte: 30 },
        name: /bánh/i
    });

    res.json({ status: true, data: list });
});
//13.Tìm sản phẩm theo nhiều điều kiện: name chứa “kem” hoặc “socola”, và giá > 200,000.
router.get("/filter/13", async function (req, res) {
    const list = await productModel.find({
        price: { $gt: 200000 },
        $or: [
            { name: /kem/i },
            { name: /socola/i }
        ]
    });
    res.json({ status: true, data: list });
});

//14 Lấy danh sách sản phẩm có quantity > 20, sắp xếp theo quantity giảm dần, sau đó theo price tăng dần.
router.get("/filter/14", async function (req, res) {
    const list = await productModel
        .find({ quantity: { $gt: 20 } })
        .sort({ quantity: -1, price: 1 });

    res.json({ status: true, data: list });
});

//15.Lấy danh sách sản phẩm theo cateID nhưng loại bỏ các sản phẩm có status = false
router.get("/filter/15", async function (req, res) {
    const CateID = req.query.CateID;
    const list = await productModel.find({ CateID: CateID, status: true });
    res.json({ status: true, data: list });
});
//16. Tìm sản phẩm có price thấp nhất trong toàn bộ danh sách.
router.get("/filter/abcde", async function (req, res) {
    const list = await productModel.find().sort({ price: 1 }).limit(1);
    res.json({ status: true, data: list });
});
//17. Tìm 5 sản phẩm có price cao nhất nhưng quantity phải lớn hơn 10.
router.get("/filter/abdef", async function (req, res) {
    const list = await productModel.find({
        quantity: { $gt: 10 }
    }).sort({ price: -1 }).limit(5);
    res.json({ status: true, data: list });
});

//18 Tìm tất cả sản phẩm có name bắt đầu bằng chữ “Bánh” và description chứa từ “vani”.
router.get("/filter/18", async function (req, res) {
    const list = await productModel.find({
        name: { $regex: "^Bánh", $options: "i" },
        description: /vani/i
    });

    res.json({ status: true, data: list });
});

//19 Lọc danh sách sản phẩm tạo trong vòng 7 ngày trở lại đây dựa vào createAt.
router.get("/filter/19", async function (req, res) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const list = await productModel.find({
        createdAt: { $gte: sevenDaysAgo }
    });

    res.json({ status: true, data: list });
});

//20 Lấy danh sách sản phẩm theo cateID, và chỉ trả về các field: name, price, quantity.
router.get("/filter/abcdefgh", async function (req, res) {
    const CateID = req.query.CateID;
    const list = await productModel.find({ CateID: CateID }).select("name price quantity");
    res.json({ status: true, data: list });
});
//21 Tìm sản phẩm có price từ 20,000 đến 200,000 và name KHÔNG chứa chữ “socola”.
router.get("/filter/abc1", async function (req, res) {
    const list = await productModel.find({
        price: { $gte: 20000, $lte: 200000 },
        name: { $not: { $regex: "socola", $options: "i" } }
    })
    res.json({ status: true, data: list });
});

//----------------------------------------
router.post('/upload', [upload.single('hinhAnh')],
    async (req, res, next) => {
        try {
            const { file } = req;
            if (!file) {
                return res.json({ status: 0, link: "" });
            } else {
                const url = `http://localhost:3000/images/${file.filename}`;
                return res.json({ status: 1, url: url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({ status: 0, link: "" });
        }
    });

//
router.post('/uploads', [upload.array('image', 9)],
    async (req, res, next) => {
        try {
            const { files } = req;
            if (!files) {
                return res.json({ status: 0, link: [] });
            } else {
                const url = [];
                for (const singleFile of files) {
                    url.push(`http://localhost:3000/images/${singleFile.filename}`);
                }
                return res.json({ status: 1, url: url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({ status: 0, link: [] });
        }
    });

router.post("/send-mail", async function (req, res, next) {
  try {
    const { to, subject, content } = req.body;

    const htmlContent = `
      <div style="margin:0; padding:0; background:#f0f2f5; font-family: Arial, Helvetica, sans-serif;">
        <div style="max-width:650px; margin:40px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 8px 20px rgba(0,0,0,0.15);">
          
          <!-- HEADER -->
          <div style="background:linear-gradient(135deg, #6a11cb, #2575fc); padding:25px; text-align:center;">
            <h1 style="color:#fff; margin:0; font-size:26px;">📩 THÔNG BÁO MỚI</h1>
            <p style="color:#e0e0e0; margin-top:8px;">Hệ thống tự động gửi mail</p>
          </div>

          <!-- BODY -->
          <div style="padding:35px; color:#333;">
            <h2 style="margin-top:0;">Xin chào bạn 👋</h2>
            
            <p style="font-size:16px; line-height:1.7;">
              Bạn vừa nhận được một thông báo mới 
            </p>

            <div style="margin:25px 0; padding:20px; background:#f7f9ff; border-radius:8px; border:1px dashed #2575fc;">
              <p style="margin:0; font-size:16px; color:#444;">
                ${content || "Nội dung thông báo sẽ hiển thị tại đây."}
              </p>
            </div>

            <div style="text-align:center; margin-top:35px;">
              <a href="https://google.com"
                style="display:inline-block; padding:14px 30px; background:linear-gradient(135deg,#6a11cb,#2575fc); color:#fff; text-decoration:none; border-radius:30px; font-size:16px; font-weight:bold;">
                🔎 XEM CHI TIẾT
              </a>
            </div>
          </div>

          <!-- FOOTER -->
          <div style="background:#f1f1f1; padding:18px; text-align:center; font-size:13px; color:#777;">
            <p style="margin:0;">© 2025 Hệ Thống </p>
          </div>

        </div>
      </div>
    `;

    const mailOptions = {
      from: "abc <havatar123@gmail.com>",
      to: to,
      subject: subject,
      html: htmlContent
    };

    await sendMail.transporter.sendMail(mailOptions);

    res.json({ status: 1, message: "Gửi mail thành công" });

  } catch (err) {
    console.log("Lỗi gửi mail:", err);
    res.json({ status: 0, message: "Gửi mail thất bại" });
  }
});

module.exports = router;
