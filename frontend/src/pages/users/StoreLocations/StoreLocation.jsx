import classNames from "classnames/bind";
import styles from "./StoreLocation.module.scss"

const cx = classNames.bind(styles);
const StoreLocation = () => {
    return (
        <div className={cx("wrapper")}>
            <h1>Hệ Thống cửa hàng</h1>
        </div>
    )
}

export default StoreLocation;