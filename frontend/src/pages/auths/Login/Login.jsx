import * as React from 'react';
import {useState} from 'react';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import { login } from '/src/services/auth/login';



const cx = classNames.bind(styles);


export default function Login() {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target)
        setLoginData({ ...loginData, [name]: value });
    }

    useEffect(() => {
        // Kiểm tra dữ liệu và cập nhật formErrors khi formData thay đổi
        const errors = { ...formErrors };
        if (formData.name === '') {
          errors.name = 'Vui lòng nhập tên.';
        }
        if (formData.email === '' || !formData.email.includes('@')) {
          errors.email = 'Email không hợp lệ.';
        }
        setFormErrors(errors);
      }, [formData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(login({
            email: loginData.email,
            password: loginData.password,
        }));
        // Xử lý đăng ký tại đây (có thể gửi dữ liệu đăng ký đến máy chủ).
        console.log('Đăng nhập thành công:', loginData);
    }

    return (
        <div className={cx('container')}>
            <div className={cx('heading')}>
                <h3>ĐĂNG NHẬP TÀI KHOẢN</h3>
                <p>Bạn chưa có tài khoản? Đăng ký <Link to={"/signup"}>tại đây</Link></p>
            </div>

            <form action="" method="POST" className={cx("form")} onSubmit={handleSubmit} id="form-2">
                <h3 className={cx("info")}>Thông tin cá nhân</h3>

                <div className="spacer"></div>

                <div className={cx("form-group")}>
                    <label htmlFor="email" className={cx("form-label")}>Email<span> *</span></label>
                    <input
                        required
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={loginData.email}
                        onChange={handleInputChange}
                        className={cx("form-control")} />
                    <span className={cx("form-message")}></span>
                </div>

                <div className={cx("form-group")}>
                    <label htmlFor="password" className={cx("form-label")}>Mật khẩu<span> *</span></label>
                    <input
                        required
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Mật khẩu"
                        value={loginData.password}
                        onChange={handleInputChange}
                        className={cx("form-control")} />
                    <span className={cx("form-message")}></span>
                </div>

                <button
                    className={cx("form-submit")}
                >Đăng nhập
                </button>

            </form>
        </div>
    );
}
