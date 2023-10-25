import classNames from "classnames/bind";
import styles from "./Footer.module.scss"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
const cx = classNames.bind(styles);
const Footer = () => {


    return (
        <div className={cx("wrapper")}>
            <div className={cx("box")}>
                <div>
                    <a href="/">
                        <img src="src/layouts/UserLayout/NANA2.png" alt="" />
                    </a>
                </div>
                <div className={cx("detail")}>
                    <h1>CÔNG TY CỔ PHẦN THƯƠNG MẠI & DỊCH VỤ NANA</h1>
                    <h1 style={{marginBottom:'20px'}}>MÃ SỐ THUẾ: 20205107</h1>
                    <span><LocationOnIcon/> Địa chỉ: Bach Khoa Ha Noi</span>
                    <span><LocalPhoneIcon/> Số điện thoại: 0987299099</span>
                    <span><MailIcon/> Email: ngango@gmail.com</span>
                </div>
            </div>
        </div>
    )
}

export default Footer;