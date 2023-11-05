import * as React from 'react';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Signup.module.scss';

const cx = classNames.bind(styles);


export default function Signup() {

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý đăng ký tại đây (có thể gửi dữ liệu đăng ký đến máy chủ).
        console.log('Đăng ký thành công:', formData);
    }


    return (
        <div className={cx('container')}>
            <div className={cx('heading')}>
                <h3>ĐĂNG KÝ TÀI KHOẢN</h3>
                <p>Bạn đã có tài khoản? Đăng nhập <Link to={"/login"}>tại đây</Link></p>
            </div>

            <form action="" method="POST" className={cx("form")} onSubmit={handleSubmit} id="form-1">
                <h3 className={cx("info")}>Thông tin cá nhân</h3>

                <div className="spacer"></div>

                <div className={cx("form-group")}>
                    <label htmlFor="fullname" className={cx("form-label")}>Tên đầy đủ<span> *</span></label>
                    <input
                        required
                        id="fullname"
                        name="fullname"
                        type="text"
                        placeholder="Họ và tên"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={cx("form-control")} />
                    <span className={cx("form-message")}></span>
                </div>

                <div className={cx("form-group")}>
                    <label htmlFor="phoneNumber" className={cx("form-label")}>Số điện thoại<span> *</span></label>
                    <input
                        required
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        placeholder="Số điện thoại"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className={cx("form-control")} />
                    <span className={cx("form-message")}></span>
                </div>

                <div className={cx("form-group")}>
                    <label htmlFor="email" className={cx("form-label")}>Email<span> *</span></label>
                    <input
                        required
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={formData.email}
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
                        value={formData.password}
                        onChange={handleInputChange}
                        className={cx("form-control")} />
                    <span className={cx("form-message")}></span>
                </div>

                <button
                    className={cx("form-submit")}
                >Đăng ký
                </button>

            </form>
        </div>
    );
}
