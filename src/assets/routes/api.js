var express = require('express');
var router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
//Thiết lập nơi lưu trữ và tên file
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
//Kiểm tra file upload
function checkFileUpLoad(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Bạn chỉ được upload file ảnh'));
    }
    cb(null, true);
}
//Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });

//Imort model
const connectDb = require('../models/db');

//---------------------------Products--------------------------------//
// Lấy danh sách sản phẩm nổi bật
router.get("/producthot", async (req, res) => {
  const db = await connectDb();
  const productCollection = db.collection("products");
  const product = await productCollection.find({ hot: 1}).toArray();
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "không tìm thấy sản phẩm." });
  }
});

// Lấy danh sách sản phẩm theo Mã danh mục
router.get("/products/categoryId/:id", async (req, res, next) => {
  try {
    const categoryId = parseInt(req.params.id); // Lấy category ID từ request params
    const db = await connectDb();
    const productCollection = db.collection("products");
    const products = await productCollection
      .find({ categoryId: categoryId })
      .toArray(); // Lọc danh sách sản phẩm dựa trên category ID
    if (products.length > 0) {
      res.status(200).json(products); // Trả về danh sách sản phẩm dưới dạng JSON
    } else {
      res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm cho danh mục này." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy danh sách sản phẩm theo Tên danh mục
router.get("/products/categoryName/:name", async (req, res, next) => {
  try {
    const categoryName = req.params.name; // Lấy tên danh mục từ request params
    const db = await connectDb();
    const categoriesCollection = db.collection("categories");
    // Tìm danh mục có tên chứa từ khóa tìm kiếm
    const category = await categoriesCollection.findOne({
      name: { $regex: categoryName, $options: "i" },
    });
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục." });
    }
    const categoryId = category.id; // Lấy ID của danh mục
    const productCollection = db.collection("products");
    // Lọc danh sách sản phẩm dựa trên categoryId
    const products = await productCollection
      .find({ categoryId: categoryId })
      .toArray();
    if (products.length > 0) {
      res.status(200).json(products); // Trả về danh sách sản phẩm dưới dạng JSON
    } else {
      res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm cho danh mục này." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Render trang API
router.get('/', async (req, res, next) => {
  res.render('api');
});

// Lấy danh sách sản phẩm nổi bật (hot products)
router.get('/products/hot', async (req, res) => {
  try {
      const db = await connectDb();
      const productCollection = db.collection('products');

      const hotProducts = await productCollection.find({ hot: 1 }).toArray(); // Sửa lại từ "bestseller" thành "hot"

      if (hotProducts.length > 0) {
          res.status(200).json(hotProducts);
      } else {
          res.status(404).json({ message: 'Không tìm thấy sản phẩm nổi bật.' });
      }
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy dữ liệu sản phẩm nổi bật.' });
  }
});

// Lấy danh sách sản phẩm
router.get('/products', async (req, res, next) => {
  try {
      const db = await connectDb();
      const productCollection = db.collection('products');
      const products = await productCollection.find().toArray();

      if (products.length > 0) {
          res.status(200).json(products);
      } else {
          res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
      }
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy dữ liệu sản phẩm.' });
  }
});

// Lấy sản phẩm theo ID
router.get('/products/:id', async (req, res, next) => {
  try {
      const id = req.params.id;
      const db = await connectDb();
      const productCollection = db.collection('products');
      const product = await productCollection.findOne({ id: id });

      if (product) {
          res.status(200).json(product);
      } else {
          res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
      }
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy dữ liệu sản phẩm.' });
  }
});

// Thêm sản phẩm mới product add
router.post('/products', async (req, res, next) => {
  try {
    const { name, price, categoryId, description, img } = req.body;
    console.log(name, price, categoryId, description, img);
    const db = await connectDb();
    const productCollection = db.collection('products');

    let lastProduct = await productCollection.find().sort({ id: -1 }).limit(1).toArray();
    let id = lastProduct[0] ? lastProduct[0].id + 1 : 1;
    let newProduct = { id, name, price, categoryId, img, description };

    await productCollection.insertOne(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm sản phẩm.' });
  }
});


// Sửa sản phẩm
router.put('/products/:id', async (req, res, next) => {
  try {
      const id = req.params.id;
      const { name, price, categoryId, description, img } = req.body;
      const db = await connectDb();
      const productCollection = db.collection('products');

      const updateFields = { name, price, categoryId, description, img };
      const result = await productCollection.updateOne({ id: id }, { $set: updateFields });

      if (result.modifiedCount > 0) {
          res.status(200).json(updateFields);
      } else {
          res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
      }
  } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật sản phẩm.' });
  }
});

// Xóa sản phẩm
router.delete('/products/:id', async (req, res, next) => {
  try {
      const id = req.params.id;
      const db = await connectDb();
      const productCollection = db.collection('products');
      const result = await productCollection.deleteOne({ id : id });

      if (result.deletedCount > 0) {
          res.status(200).json({ message: 'Xóa thành công' });
      } else {
          res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
      }
  } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa sản phẩm.' });
  }
});








//---------------------------Categories--------------------------------//

// Lấy danh sách các danh mục
router.get('/categories', async (req, res, next) => {
    try {
        const db = await connectDb();
        const categoriesCollection = db.collection('categories');
        const categories = await categoriesCollection.find().toArray();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Thêm danh mục mới
router.post('/categories', upload.single('img'), async (req, res, next) => {
    try {
        const db = await connectDb();
        const categoriesCollection = db.collection('categories');
        let { name } = req.body;
        let img = req.file ? req.file.originalname : null; // Kiểm tra xem req.file có tồn tại không trước khi truy cập thuộc tính 'originalname'
        let lastCategory = await categoriesCollection.find().sort({ id: -1 }).limit(1).toArray();
        let id = lastCategory[0] ? lastCategory[0].id + 1 : 1;
        let newCategory = { id, name, img };
        await categoriesCollection.insertOne(newCategory);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy danh mục theo ID
router.get('/categories/:id', async (req, res) => {
  try {
    const db = await connectDb();
    const categoriesCollection = db.collection('categories');
    let id = req.params.id;
    const category = await categoriesCollection.findOne({ id: id }); // Sử dụng trường `_id` dưới dạng chuỗi

    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Không tìm thấy danh mục' });
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh mục:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// Sửa danh mục
router.put('/categories/:id', async (req, res, next) => {
  try {
      const db = await connectDb();
      const categoriesCollection = db.collection('categories');
      let { name } = req.body;

      // Create an object with the fields to update
      let editCategory = { name };

      // Attempt to update the category
      const updateResult = await categoriesCollection.updateOne(
          { id: (req.params.id) }, // Ensure id is parsed as an integer if your schema requires it
          { $set: editCategory }
      );
      console.log(updateResult)

      // Check if the category was found and updated
      if (updateResult.matchedCount === 0) {
          return res.status(404).json({ message: 'Category not found' });
      }

      // Respond with the updated category data
      res.status(200).json(editCategory);
  } catch (error) {
      // Handle any errors that occur during the update process
      res.status(500).json({ message: error.message });
  }
});


// Xóa danh mục
router.delete('/categories/:id', async (req, res) => {
  try {
      let id = req.params.id;
      const db = await connectDb();
      const categoriesCollection = db.collection('categories');
      const result = await categoriesCollection.deleteOne({ id: id });

      if (result.deletedCount === 1) {
          res.status(200).json({ message: 'Xóa thành công' });
      } else {
          res.status(404).json({ message: 'Không tìm thấy danh mục để xóa' });
      }
  } catch (error) {
      console.error('Lỗi khi xóa danh mục:', error);
      res.status(500).json({ message: error.message });
  }
});

//---------------------------Mới Học--------------------------------//

// Lấy danh sách sản phẩm theo Mã danh mục
router.get('/products/categoryId/:id', async (req, res, next) => {
    try {
        const categoryId = parseInt(req.params.id); // Lấy category ID từ request params
        const db = await connectDb();
        const productCollection = db.collection('products');
        const products = await productCollection.find({ categoryId: categoryId }).toArray(); // Lọc danh sách sản phẩm dựa trên category ID
        if (products.length > 0) {
            res.status(200).json(products); // Trả về danh sách sản phẩm dưới dạng JSON
        } else {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm cho danh mục này.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy danh sách sản phẩm theo Tên danh mục
router.get('/products/categoryName/:name', async (req, res, next) => {
    try {
        const categoryName = req.params.name; // Lấy tên danh mục từ request params
        const db = await connectDb();
        const categoriesCollection = db.collection('categories');

        // Tìm danh mục có tên chứa từ khóa tìm kiếm
        const category = await categoriesCollection.findOne({ name: { $regex: categoryName, $options: 'i' } });

        if (!category) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục.' });
        }

        const categoryId = category.id; // Lấy ID của danh mục
        const productCollection = db.collection('products');

        // Lọc danh sách sản phẩm dựa trên categoryId
        const products = await productCollection.find({ categoryId: categoryId }).toArray();

        if (products.length > 0) {
            res.status(200).json(products); // Trả về danh sách sản phẩm dưới dạng JSON
        } else {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm cho danh mục này.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy danh sách sản phẩm nổi bật có bestseller = 1 Đang hỏng nặng


// Trả về danh sách sản phẩm dựa trên trang và số lượng
router.get('/products/page/:page/limit/:limit', async (req, res, next) => {
    try {
        const page = parseInt(req.params.page) || 1; // Lấy trang từ params URL, mặc định là trang 1 nếu không có
        const limit = parseInt(req.params.limit) || 10; // Lấy số lượng từ params URL, mặc định là 10 nếu không có
        const skip = (page - 1) * limit; // Tính vị trí bắt đầu của trang hiện tại

        const db = await connectDb();
        const productCollection = db.collection('products');

        // Sử dụng phương thức skip() và limit() để phân trang và giới hạn số lượng
        const products = await productCollection.find().skip(skip).limit(limit).toArray();

        if (products.length > 0) {
            res.status(200).json(products); // Trả về danh sách sản phẩm dưới dạng JSON
        } else {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Trả về danh sách sản phẩm dựa trên từ khóa tìm kiếm
router.get('/products/search/:keyword', async (req, res, next) => {
    try {
        let keyword = req.params.keyword; // Lấy từ khóa tìm kiếm từ URL params

        // Tạo một biến regular expression từ từ khóa, cho phép không phân biệt chữ hoa chữ thường
        const regexKeyword = new RegExp(keyword, 'i');

        // Tạo một biến regular expression từ từ khóa, xử lý việc tìm kiếm cho các chữ số và ký tự "k" hoặc "K"
        const regexKeywordWithK = new RegExp(keyword.replace(/[kK]/g, '[kK]?'), 'i');

        const db = await connectDb();
        const productCollection = db.collection('products');

        // Tìm các sản phẩm có tên chứa từ khóa tìm kiếm (sử dụng regex và tùy chọn không phân biệt chữ hoa chữ thường)
        const products = await productCollection.find({ $or: [{ name: regexKeyword }, { name: regexKeywordWithK }] }).toArray();

        if (products.length > 0) {
            res.status(200).json(products); // Trả về danh sách sản phẩm dưới dạng JSON
        } else {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm nào phù hợp với từ khóa tìm kiếm.' });
        }
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Trả về danh sách sản phẩm được sắp xếp và giới hạn số lượng
router.get('/products/sort/:order/limit/:limit', async (req, res, next) => {
    try {
        const order = req.params.order.toLowerCase(); // Lấy thứ tự sắp xếp từ URL params và chuyển thành chữ thường
        const limit = parseInt(req.params.limit) || 10; // Lấy số lượng từ URL params, mặc định là 10 nếu không có

        const db = await connectDb();
        const productCollection = db.collection('products');

        let sortQuery = {}; // Khởi tạo truy vấn sắp xếp rỗng

        // Xác định trường sắp xếp dựa trên order
        if (order === 'asc') {
            sortQuery = { price: 1 }; // Sắp xếp theo giá tăng dần
        } else if (order === 'desc') {
            sortQuery = { price: -1 }; // Sắp xếp theo giá giảm dần
        } else {
            return res.status(400).json({ message: 'Thứ tự sắp xếp không hợp lệ.' }); // Trả về lỗi nếu thứ tự sắp xếp không hợp lệ
        }

        // Sử dụng phương thức sort() và limit() để sắp xếp và giới hạn số lượng sản phẩm
        const products = await productCollection.find().sort(sortQuery).limit(limit).toArray();

        if (products.length > 0) {
            res.status(200).json(products); // Trả về danh sách sản phẩm dưới dạng JSON
        } else {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
        }
    } catch (error) {
        console.error("Error sorting products:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
//--------------------------Cart----------------------------------//
// Thêm sản phẩm vào giỏ hàng
router.post('/cart/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    const db = await connectDb();
    const cartCollection = db.collection('carts');
  
    try {
      let cartItem = await cartCollection.findOne({ userId, productId });
      if (cartItem) {
        await cartCollection.updateOne({ userId, productId }, { $inc: { quantity } });
      } else {
        await cartCollection.insertOne({ userId, productId, quantity });
      }
      res.status(200).send('Product added to cart');
    } catch (error) {
      res.status(500).send('Error adding product to cart');
    }
  });

// Lấy thông tin giỏ hàng
router.get('/cart/:userId', async (req, res) => {
    const userId = req.params.userId;
    const db = await connectDb();
    const cartCollection = db.collection('carts');
    const productCollection = db.collection('products');

    try {
        const cartItems = await cartCollection.find({ userId }).toArray();
        const productIds = cartItems.map(item => item.productId);
        const products = await productCollection.find({ id: { $in: productIds } }).toArray();
        const cartWithProducts = cartItems.map(item => {
            const product = products.find(p => p.id === item.productId);
            return {
                name: product?.name || 'Unknown',
                img: product?.img || '',  // Sử dụng 'img' thay vì 'image'
                detail: product?.detail || 'No detail available',
                price: product?.price || '$0.00',  // Đảm bảo định dạng đúng
                quantity: item.quantity
            };
        });
        res.json(cartWithProducts);
    } catch (error) {
        res.status(500).send('Error fetching cart items');
    }
});

// Xóa sản phẩm khỏi giỏ hàng
router.delete('/cart/remove', async (req, res) => {
    const { userId, productId } = req.body;
    const db = await connectDb();
    const cartCollection = db.collection('carts');

    try {
        await cartCollection.deleteOne({ userId, productId });
        res.status(200).send('Product removed from cart');
    } catch (error) {
        res.status(500).send('Error removing product from cart');
    }
});

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.put('/cart/update', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    const db = await connectDb();
    const cartCollection = db.collection('carts');

    try {
        await cartCollection.updateOne({ userId, productId }, { $set: { quantity } });
        res.status(200).send('Cart item updated');
    } catch (error) {
        res.status(500).send('Error updating cart item');
    }
});
//--------------------------End Cart----------------------------------//

//---------------------------Users--------------------------------//


//Trả về json danh sách users
router.get('/users', async (req, res, next) => {
    const db = await connectDb();
    const userCollection = db.collection('users');
    const users = await userCollection.find().toArray();
    if (users) {
        res.status(200).json(users);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});

//Trả về json users theo id
router.get('/users/:id', async (req, res, next) => {
    const db = await connectDb();
    const usersCollection = db.collection('users');
    let id = req.params.id;
    const users = await usersCollection.findOne({ id: parseInt(id) });
    if (users) {
        res.status(200).json(users);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});

//Post thêm users
router.post('/users', upload.single('img'), async (req, res, next) => {
    let { username, password, repassword, email, role } = req.body;
    let img = req.file.originalname;
    const db = await connectDb();
    const usersCollection = db.collection('users');
    let lastUser = await usersCollection.find().sort({ id: -1 }).limit(1).toArray();
    let id = lastUser[0] ? lastUser[0].id + 1 : 1;
    let newUser = { id, username, password, email, img, isAdmin: role === 'admin' };
    await usersCollection.insertOne(newUser);
    if (newUser) {
        res.status(200).json(newUser);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});

//Put sửa users từ form
router.put('/users/:id', upload.single('img'), async (req, res, next) => {
    let id = req.params.id;
    const db = await connectDb();
    const usersCollection = db.collection('users');
    let { username, password, email } = req.body;
    if (req.file) {
        var img = req.file.originalname;
    } else {
        //láy danh mục tư id để lấy img cũ
        let users = await usersCollection.findOne({ id: parseInt(id) });
        var img = users.img;
    }
    let editUsers = { username, password, email, img };
    users = await usersCollection.updateOne({ id: parseInt(id) }, { $set: editUsers });
    if (users) {
        res.status(200).json(editUsers);
    } else {
        res.status(404).json({ message: 'Sửa không thành kông.' });
    }
});

//Xóa users
router.delete('/users/:id', async (req, res, next) => {
    let id = req.params.id;
    const db = await connectDb();
    const usersCollection = db.collection('users');
    let user = await usersCollection.deleteOne({ id: parseInt(id) });
    if (user) {
        res.status(200).json({ message: 'Xoa thanhkong.' });
    } else {
        res.status(404).json({ message: 'Xoa khong thanhkong.' });
    }
});

router.post('/users/register', async (req, res) => {
    const { email, password, username, fullname } = req.body;
    const db = await connectDb();
    const userCollection = db.collection('users');

    try {
        // Kiểm tra xem email đã tồn tại chưa
        let user = await userCollection.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'Email đã tồn tại' });
        }

        // Tạo ID mới
        let lastUser = await userCollection.find().sort({ id: -1 }).limit(1).toArray();
        let id = lastUser[0] ? (parseInt(lastUser[0].id, 10) + 1).toString() : '1';

        // Mã hóa mật khẩu
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        const newUser = {
            id,
            fullname,
            username,
            email,
            password: hashPassword,
            isAdmin: 0,
            avatar: "" // Hoặc để trống nếu không có ảnh đại diện
        };

        // Thêm người dùng mới vào cơ sở dữ liệu
        await userCollection.insertOne(newUser);

        // Phản hồi thành công
        res.status(200).json({ message: 'Đăng ký thành công' });
    } catch (error) {
        // Xử lý lỗi và trả về phản hồi lỗi
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi khi thêm người dùng mới' });
    }
});
//  Đăng nhập-------------------------------------------------------------
// Chức năng đăng nhập sử dụng token
router.post("/users/login", async (req, res) => {
  const db = await connectDb();
  const userCollection = db.collection("users");
  const { email, password } = req.body;

  try {
    const user = await userCollection.findOne({ email });

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        // Nếu thông tin đăng nhập chính xác, trả về thông tin người dùng
        res.status(200).json({
          email: user.email,
          username: user.username,
          img: user.img
        });
      } else {
        res.status(403).json({ message: "Incorrect password" });
      }
    } else {
      res.status(403).json({ message: "Email not registered" });
    }
  } catch (error) {
    console.error("Server error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});


  // router.post('/users/login', async (req, res) => {
  //   const { email, password } = req.body;
  //   const db = await connectDb();
  //   const userCollection = db.collection('users');
    
  //   const user = await userCollection.findOne({ email });
  //   if (user) {
  //     if (bcrypt.compareSync(password, user.password)) {
  //       const token = jwt.sign(
  //         { email: user.email, isAdmin: user.isAdmin },
  //         'secretkey',
  //         { expiresIn: '1h' }
  //       );
  //       res.status(200).json({ token });
  //     } else {
  //       res.status(403).json({ message: 'Email hoặc mật khẩu không đúng' });
  //     }
  //   } else {
  //     res.status(403).json({ message: 'Email này chưa đăng ký' });
  //   }
  // });
  
    
  
  // function authenToken(req, res, next) {
  //   const bearerHeader = req.headers['authorization'];
  //   if (typeof bearerHeader !== 'undefined') {
  //     const bearerToken = bearerHeader.split(' ')[1];
  //     req.token = bearerToken;
  //     jwt.verify(req.token, 'secretkey', (err, authData) => {
  //       if (err) {
  //         res.status(403).json({ message: 'Không có quyền truy cập' });
  //       } else {
  //         next();
  //       }
  //     });
  //   } else {
  //     res.status(403).json({ message: 'Không có quyền truy cập' });
  //   }
  // }
  
// Lấy danh sách sản phẩm theo Tên danh mục
router.get('/products/categoryName/:name', async (req, res, next) => {
  try {
      const categoryName = req.params.name; // Lấy tên danh mục từ request params
      const db = await connectDb();
      const categoriesCollection = db.collection('categories');

      // Tìm danh mục có tên chứa từ khóa tìm kiếm
      const category = await categoriesCollection.findOne({ name: { $regex: categoryName, $options: 'i' } });

      if (!category) {
          return res.status(404).json({ message: 'Không tìm thấy danh mục.' });
      }

      const categoryId = category.id; // Lấy ID của danh mục
      const productCollection = db.collection('products');

      // Lọc danh sách sản phẩm dựa trên categoryId
      const products = await productCollection.find({ categoryId: categoryId }).toArray();

      if (products.length > 0) {
          res.status(200).json(products); // Trả về danh sách sản phẩm dưới dạng JSON
      } else {
          res.status(404).json({ message: 'Không tìm thấy sản phẩm cho danh mục này.' });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


module.exports = router;

