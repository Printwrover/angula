import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '/public/css/bootstrap.min.css';
import '/public/css/style.css';
import '/public/js/main.js';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Check if token exists in localStorage
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <div className="container-fluid position-relative p-0">
      <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
        <a className="navbar-brand p-0" href="">
          <h1 className="text-primary m-0">
            <i className="fa-brands fa-playstation" /> CarTeam
          </h1>
        </a>
        <button className="navbar-toggler" data-bs-target="#navbarCollapse" data-bs-toggle="collapse" type="button">
          <span className="fa fa-bars" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <Link className="nav-item nav-link" to="/">Trang Chủ</Link>
            <Link className="nav-item nav-link" to="/Products">Sản Phẩm</Link>
            <Link className="nav-item nav-link" to="/ContactStart">Địa Chỉ</Link>
            <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#">Danh Mục</a>
              <div className="dropdown-menu m-0">
                <a className="dropdown-item" href="destination.html">Destination</a>
                <a className="dropdown-item" href="booking.html">Booking</a>
                <a className="dropdown-item" href="team.html">Travel Guides</a>
                <a className="dropdown-item" href="testimonial.html">Testimonial</a>
                <a className="dropdown-item" href="404.html">404 Page</a>
              </div>
            </div>
            <Link className="nav-item nav-link" to="/Cart">Giỏ Hàng</Link>
          </div>
          {!isLoggedIn ? (
            <Link className="btn btn-primary rounded-pill py-2 px-4" to="/Login">Đăng Nhập</Link>
          ) : (
            <button className="btn btn-primary rounded-pill py-2 px-4" onClick={handleLogout}>Đăng Xuất</button>
          )}
        </div>
      </nav>
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white mb-3 animated slideInDown">Moto Team</h1>
              <p className="fs-4 text-white mb-4 animated slideInDown">
                Tempor erat elitr rebum at clita diam amet diam et eos erat ipsum lorem sit
              </p>
              <div className="position-relative w-75 mx-auto animated slideInDown">
                <input
                  className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5"
                  placeholder="Eg: Thailand"
                  type="text"
                />
                <button className="btn btn-primary rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2" style={{ marginTop: "7px" }} type="button">
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
