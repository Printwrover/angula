import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '/public/css/bootstrap.min.css';
import '/public/css/style.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Lưu thông tin vào localStorage
        localStorage.setItem('user', JSON.stringify({
          name: data.username, // Lưu tên người dùng
          email: data.email, // Lưu email người dùng
          img: data.img // Lưu hình ảnh người dùng
        }));
        toast.success("Đăng nhập thành công!");
        onLogin(); // Gọi hàm onLogin để cập nhật trạng thái đăng nhập nếu cần
        navigate('/'); // Chuyển hướng người dùng đến trang chủ
      } else {
        console.error('Error response:', data);
        toast.error(data.message || "Đăng nhập thất bại.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  return (
    <>
      <section className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-sm-12">
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="auth-box card">
                  <div className="card-block">
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="text-center heading">
                          Đăng nhập vào tài khoản của bạn
                        </h3>
                      </div>
                    </div>
                    <div className="mb-4">
                      <input
                        className="form-control"
                        placeholder="Email"
                        type="email"
                        aria-required="true"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        className="form-control"
                        placeholder="Mật khẩu"
                        type="password"
                        aria-required="true"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="row">
                      <div className="mb-4">
                        <button
                          className="btn btn-primary btn-md btn-block"
                          type="submit"
                        >
                          Đăng nhập
                        </button>
                      </div>
                    </div>
                    <div className="or-container">
                      <div className="line-separator" />
                      <div className="or-label" />
                      <div className="line-separator" />
                    </div>
                    <div className="row">
                      <div className="mb-4">
                        <a className="form-control" href="#">
                          <img
                            src="https://img.icons8.com/color/16/000000/google-logo.png"
                            alt="Google logo"
                          />
                          {' '}Đăng nhập bằng Google
                        </a>
                      </div>
                    </div>
                    <br />
                    <p className="text-center">
                      Chưa có tài khoản?{' '}
                      <Link to="/register">Đăng ký</Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func, // Không bắt buộc
};

export default Login;