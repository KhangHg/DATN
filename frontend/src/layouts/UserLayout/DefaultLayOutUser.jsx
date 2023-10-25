import classNames from 'classnames/bind';
import styles from "./DefaultLayOutUser.module.scss"
import Header from './Header';
import Footer from './Footer';
const cx = classNames.bind(styles);

function DefaultLayoutUser({ title, children }) {

    return (
        <div className={cx('wrapper')}>
            <Header/>
            <div className={cx("content")}>
                <div className={cx("box")}>
                    {children}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default DefaultLayoutUser;
