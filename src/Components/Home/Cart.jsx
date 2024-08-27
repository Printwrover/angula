import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Cart = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Lấy giỏ hàng từ localStorage
    const fetchCartItems = () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin giỏ hàng:', error);
        setError('Không thể tải thông tin giỏ hàng');
        setLoading(false);
      }
    };


    fetchCartItems();
  }, [userId]); 

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;
// Hàm xử lý khi xóa sản phẩm khỏi giỏ hàng
const handleRemoveFromCart = (productId) => {
  // Cập nhật state cartItems và localStorage
  const updatedCartItems = cartItems.filter(item => item.productId !== productId);
  setCartItems(updatedCartItems);
  localStorage.setItem('cart', JSON.stringify(updatedCartItems));
};
  // Tính tổng tiền trong giỏ hàng
  const total = cartItems.reduce((sum, product) => 
    sum + parseFloat(product.price.slice(1)) * product.quantity, 0);

  return (
    <section className="ftco-section ftco-cart">
      <div className="container">
        <div className="row">
          <div className="col-md-12 ftco-animate">
            <div className="cart-list">
              <table className="table">
                <thead className="thead-primary">
                  <tr className="text-center">
                    <th></th>
                    <th>hình ảnh</th>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length === 0 ? (
                    <tr><td colSpan="5" className="text-center">Giỏ hàng trống</td></tr>
                  ) : (
                    cartItems.map(product => (
                      <tr key={product.productId} className="text-center">
                        <td className="product-remove " >

                        <button className="btn btn-square mx-1  mt-4" onClick={() => handleRemoveFromCart(product.productId)}>
                            <i className="fa-solid fa-trash"/>
                          </button>

                          
                        </td>
                        <td className="col-lg-6 col-md-12 wow zoomIn animated animated">
                             <td className="position-relative d-block overflow-hidden" >
                          <img className="img-fluid" src={product.img} alt={product.name}
                          style =  {{ width: "400px",  objectFit: "cover" }} />
                        </td>
                        
                        </td>
                        <td className="product-name">
                          <h3 className=" text-center text-primary  mt-5">{product.name}</h3>
                          <p>{product.detail}</p>
                        </td>
                        <h5 className="mt-5">{product.price}</h5>
                        <th>
                        <h5 className="mt-5">{product.quantity}</h5>
                        </th>
                        <h5 className="mt-4">{(parseFloat(product.price.slice(1)) * product.quantity).toFixed(2)}</h5>
                    
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col col-lg-3 col-md-6 mt-5 cart-wrap ftco-animate">
            <div className="cart-total mb-3">
              <h3>Giỏ hàng</h3>
              <p className="d-flex">
                <span>Tổng cộng</span>
                <span>${total.toFixed(2)}</span>
              </p>
              <p className="d-flex">
                <span>Vận chuyển</span>
                <span>$0.00</span>
              </p>
              <p className="d-flex">
                <span>Giảm giá</span>
                <span>$3.00</span>
              </p>
              <hr />
              <p className="d-flex total-price">
                <span>Tổng tiền</span>
                <span>${(total - 3).toFixed(2)}</span>
              </p>
            </div>
            <p className="text-center">
              <a className="btn btn-primary py-3 px-4" href="checkout.html">Tiến hành thanh toán</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Khai báo kiểu cho props
Cart.propTypes = {
  userId: PropTypes.string.isRequired,  // Hoặc kiểu phù hợp với dữ liệu của bạn
};

export default Cart;
