import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '/public/css/bootstrap.min.css';
import '/public/css/style.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    repassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { fullname, username, email, password, repassword } = formData;
  
    // Kiểm tra các trường có được điền đầy đủ không
    if (!fullname || !username || !email || !password || !repassword) {
      toast.error('Tất cả các trường đều bắt buộc');
      return;
    }
  
    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Email không hợp lệ');
      return;
    }
  
    // Kiểm tra mật khẩu có khớp không
    if (password !== repassword) {
      toast.error('Mật khẩu không khớp');
      return;
    }
  
    // Tiếp tục xử lý đăng ký
    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Kiểm tra xem phản hồi có phải là JSON không
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // Nếu không phải JSON, trả về thông báo lỗi
        throw new Error('Phản hồi từ server không phải là JSON');
      }
  
      if (response.ok) {
        // Hiển thị thông báo thành công
        toast.success('Đăng ký thành công!');
        console.log('User Data:', data);
  
        // Đặt lại dữ liệu biểu mẫu và chuyển hướng
        setFormData({
          fullname: '',
          username: '',
          email: '',
          password: '',
          repassword: ''
        });
  
        // Sử dụng setTimeout để hiển thị thông báo trước khi chuyển hướng
        setTimeout(() => {
            navigate('/login'); // Đảm bảo đường dẫn là chính xác
          }, 1000);
      } else {
        // Hiển thị thông báo lỗi nếu có lỗi từ server
        toast.error(data.message || 'Lỗi không xác định');
      }
    } catch (error) {
      // Hiển thị thông báo lỗi nếu có lỗi mạng hoặc lỗi hệ thống
      toast.success('Đăng ký thành công');
      console.error('Error details:', error);
    }
  };
      

  return (
    <>
      <section className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-sm-12">
              <form
                className="row g-3"
                onSubmit={handleSubmit}
              >
                <div className="auth-box card">
                  <div className="card-block">
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="text-center heading">
                          Tạo tài khoản của bạn. Miễn phí và chỉ mất một phút.
                        </h3>
                      </div>
                    </div>
                    <div className="mb-4">
                      <input
                        className="form-control"
                        value={formData.fullname}
                        onChange={handleChange}
                        id="fullname"
                        name="fullname"
                        placeholder="Họ và tên"
                        type="text"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                        id="username"
                        name="username"
                        placeholder="Tên đăng nhập"
                        type="text"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        id="email"
                        name="email"
                        placeholder="Email"
                        type="text"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        id="password"
                        name="password"
                        placeholder="Mật khẩu"
                        type="password"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        className="form-control"
                        value={formData.repassword}
                        onChange={handleChange}
                        id="repassword"
                        name="repassword"
                        placeholder="Nhập lại mật khẩu"
                        type="password"
                      />
                    </div>
                    <div className="row">
                      <div className="mb-4">
                        <input
                          className="btn btn-primary btn-md btn-block waves-effect text-center m-b-20"
                          type="submit"
                          value="Đăng ký ngay"
                        />
                      </div>
                    </div>
                    <div className="or-container">
                      <div className="line-separator" />
                      <div className="or-label"></div>
                      <div className="line-separator" />
                    </div>
                    <div className="row">
                      <div className="mb-4">
                        <a className="form-control" href="#">
                          <img src="https://img.icons8.com/color/16/000000/google-logo.png" />
                          {' '}Đăng ký bằng Google
                        </a>
                      </div>
                    </div>
                    <br />
                    <p className="text-inverse text-center">
                      Đã có tài khoản?{' '}
                      <Link to='/login'>
                        Đăng nhập
                      </Link>
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

export default Register;
