import * as React from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import { login } from '/src/services/auth/login';



const cx = classNames.bind(styles);


export default function Login() {

    const formikForm = useFormik({
        initialValues: {
            email:'',
            password:'',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email không đúng').required('Bạn chưa điền email!'),
            password: Yup.string().min(6, 'mật khẩu tối thiểu 6 kí tự')
                .required("Bạn chưa nhập mật khẩu"),
        }),
        onSubmit: values => {
            console.log(values)
        }
    })

    return (
        <div className={cx('container')}>
            <div className={cx('heading')}>
                <h3>ĐĂNG NHẬP TÀI KHOẢN</h3>
                <p>Bạn chưa có tài khoản? Đăng ký <Link to={"/signup"}>tại đây</Link></p>
            </div>

            <form action="" method="POST" className={cx("form")} onSubmit={formikForm.handleSubmit} id="form-2">
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
                        value={formikForm.values.email}
                        onChange={formikForm.handleChange}
                        className={cx("form-control")} />
                    {formikForm.errors.email && formikForm.touched.email && (<span className={cx("form-message")}>{formikForm.errors.email}</span>)}
                </div>

                <div className={cx("form-group")}>
                    <label htmlFor="password" className={cx("form-label")}>Mật khẩu<span> *</span></label>
                    <input
                        required
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Mật khẩu"
                        value={formikForm.values.password}
                        onChange={formikForm.handleChange}
                        className={cx("form-control")} />
                    {formikForm.errors.phoneNumber && formikForm.touched.phoneNumber && (<span className={cx("form-message")}>{formikForm.errors.phoneNumber}</span>)}
                </div>

                <button
                    className={cx("form-submit")}
                    type='submit'
                >Đăng nhập
                </button>

            </form>
        </div>
    );
}
