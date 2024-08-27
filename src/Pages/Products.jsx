import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '/public/css/bootstrap.min.css';
import '/public/css/style.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Số sản phẩm trên mỗi trang
  const apiUrl = 'http://localhost:3000/api'; // URL API của bạn

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh mục:', error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi danh mục
  };

  const handleAddToCart = (product) => {
    try {
      // Lấy giỏ hàng hiện tại từ localStorage (nếu có)
      let currentCart = JSON.parse(localStorage.getItem('cart')) || [];

      // Tìm sản phẩm trong giỏ hàng
      const existingProductIndex = currentCart.findIndex(item => item.productId === product.id);

      if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
        currentCart[existingProductIndex].quantity += 1;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
        currentCart.push({
          productId: product.id,
          img: product.img,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }

      // Lưu lại giỏ hàng vào localStorage
      localStorage.setItem('cart', JSON.stringify(currentCart));

      alert('Sản phẩm đã được thêm vào giỏ hàng');
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
      alert('Lỗi khi thêm sản phẩm vào giỏ hàng');
    }
  };

  const getFilteredProducts = () => {
    if (selectedCategory === 'All') {
      return products;
    } else {
      return products.filter(product => product.cateId === selectedCategory);
    }
  };

  const filteredProducts = getFilteredProducts();

  // Tính toán số trang
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Lấy sản phẩm cho trang hiện tại
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">Packages</h6>
            <h1 className="mb-5">Awesome Packages</h1>
            <div className="col-md-12 nav-link-wrap mb-5">
              <div
                aria-orientation="vertical"
                className="nav ftco-animate nav-pills justify-content-center"
                id="v-pills-tab"
                role="tablist"
              >
                <button
                  className={`nav-link ${selectedCategory === 'All' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('All')}
                >
                  All
                </button>
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`nav-link ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <div key={index} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${index * 0.2 + 0.1}s`}>
                  <div className="package-item">
                    <div className="overflow-hidden">
                      <img src={product.img} alt={product.name} className="img-fluid" />
                    </div>

                    <div className="text-center p-4">
                      <h3 className="mb-0">{product.name}</h3>
                      <h5 className="mb-0">{product.price}</h5>
                      <div className="mb-3">
                        <small className="fa fa-star text-primary" />
                        <small className="fa fa-star text-primary" />
                        <small className="fa fa-star text-primary" />
                        <small className="fa fa-star text-primary" />
                        <small className="fa fa-star text-primary" />
                      </div>
                      <p>{product.detail}</p>
                      <div className="d-flex justify-content-center mb-2">
                        <Link to={`/products/${product.id}`} className="btn btn-sm btn-primary px-3" style={{ borderRadius: '30px 0 0 30px' }}>
                          <i className="fa-solid fa-eye" />
                          Chi tiết
                        </Link>
                        <Link to="/cart">
                        <button className="btn btn-sm btn-primary px-3" style={{ borderRadius: '0 30px 30px 0' }} onClick={() => handleAddToCart(product)}>
                          <i className="fa-solid fa-cart-shopping" />
                          Mua
                        </button>
                        </Link>
                       
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found for this category.</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="team-item">
              <div className="overflow-hidden">
                <ul className="position-relative d-flex justify-content-center">
                  {currentPage > 1 && (
                    <li className="btn btn-square mx-1" onClick={goToPreviousPage}>
                      <a href="#">{"<"}</a>
                    </li>
                  )}
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index}
                      className={`btn btn-square mx-1 ${currentPage === index + 1 ? 'active' : ''}`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      <a href="#">{index + 1}</a>
                    </li>
                  ))}
                  {currentPage < totalPages && (
                    <li className="btn btn-square mx-1" onClick={goToNextPage}>
                      <a href="#">{">"}</a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
