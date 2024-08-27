import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "/public/css/bootstrap.min.css";
import "/public/css/style.css";
import TeamStart from "../Components/Home/TeamStart";

const ProductDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State cho số lượng
  const [error, setError] = useState(null); // State cho lỗi
  const apiUrl = "http://localhost:3000/api/products"; // Thay đổi với URL API của bạn

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${id}`);
        setProduct(response.data);  
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        setError('Không thể tải thông tin sản phẩm');
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    try {
      // Lấy giỏ hàng hiện tại từ localStorage (nếu có)
      let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Tìm sản phẩm trong giỏ hàng
      const existingProductIndex = currentCart.findIndex(item => item.productId === id);
      
      if (existingProductIndex >= 0) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        currentCart[existingProductIndex].quantity += quantity;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
        currentCart.push({
          productId: id,
          img: product.img,
          name: product.name,
          price: product.price,
          quantity: quantity,
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
  

  const handleQuantityChange = (change) => {
    setQuantity(prevQuantity => Math.max(prevQuantity + change, 1)); // Đảm bảo số lượng ít nhất là 1
  };

  if (error) return <div>{error}</div>; // Hiển thị lỗi nếu có
  if (!product) return <div>Đang tải...</div>; // Hiển thị thông báo tải nếu không tìm thấy sản phẩm

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="position-relative h-100">
                <img
                  className="img-fluid position-absolute w-100 h-100"
                  src={product.img}
                  alt={product.name}
                  style= {{ objectFit: "cover" }}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <h6 className="section-title bg-white text-start text-primary pe-3">
                Về Chúng Tôi
              </h6>
              <h1 className="mb-4">{product.name}</h1>
              <div className="d-flex mb-3">
                <div className="text-primary mr-2">
                  <small className="fas fa-star" />
                  <small className="fas fa-star" />
                  <small className="fas fa-star" />
                  <small className="fas fa-star-half-alt" />
                  <small className="far fa-star" />
                </div>
                <small className="pt-1">(50 Đánh giá)</small>
              </div>
              <h3>
                <span className="text-primary">{product.price}</span>
              </h3>
              <p className="mb-4">{product.detail}</p>
              <div className="row gy-2 gx-4 mb-4">
                <div className="d-flex align-items-center mb-4 pt-2">
                  <div
                    className="input-group quantity mr-3"
                    style={{ width: "130px" }}
                  >
                    <div className="input-group-btn">
                      <button
                        className="btn btn-primary btn-minus"
                        onClick={() => handleQuantityChange(-1)}
                      >
                        <i className="fa fa-minus" />
                      </button>
                    </div>
                    <input
                      className="form-control bg-secondary text-center"
                      value={quantity}
                      readOnly
                    />
                    <div className="input-group-btn">
                      <button
                        className="btn btn-primary btn-plus"
                        onClick={() => handleQuantityChange(1)}
                      >
                        <i className="fa fa-plus" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary px-3" onClick={handleAddToCart}>
                <i className="fa fa-shopping-cart mr-1" /> Thêm vào giỏ hàng
              </button>
            </div>
            <div className="d-flex pt-2">
              <p className="text-dark font-weight-medium mb-0 mr-2">Chia sẻ trên:</p>
              <div className="d-inline-flex">
                <a className="text-dark px-2" href="">
                  <i className="fab fa-facebook-f" />
                </a>
                <a className="text-dark px-2" href="">
                  <i className="fab fa-twitter" />
                </a>
                <a className="text-dark px-2" href="">
                  <i className="fab fa-linkedin-in" />
                </a>
                <a className="text-dark px-2" href="">
                  <i className="fab fa-pinterest" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TeamStart />
    </>
  );
};

export default ProductDetail;
