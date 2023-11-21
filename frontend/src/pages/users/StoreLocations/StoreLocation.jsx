import classNames from "classnames/bind";
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import styles from "./StoreLocation.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import originalStoreData from "./storeData";

const cx = classNames.bind(styles);
const StoreLocation = () => {
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);

    const [storeData, setStoreData] = useState(originalStoreData);

    useEffect(() => {
        // Lọc danh sách cửa hàng dựa trên tỉnh thành đã chọn
        const filteredStores = originalStoreData.filter((store) => store.province === selectedProvince?.value);
        setStoreData(filteredStores);
    }, [selectedProvince]);

    const handleProvinceChange = (selectedOption) => {
        setSelectedProvince(selectedOption);
        setSelectedStore(null); // Đặt lại lựa chọn cửa hàng khi tỉnh thành thay đổi
    };

    const handleStoreChange = (selectedOption) => {
        setSelectedStore(originalStoreData.find(store => store.id === selectedOption.value));
    };

    return (
        <div className={cx("storeLocation")}>
            <h2 className={cx("title")}>Hệ thống cửa hàng</h2>
            <div className={cx("container")}>
                <div className={cx("select")}>
                    <h5>Tìm cửa hàng</h5>
                    <div className={cx("provinceSelect")}>
                        <label>Chọn tỉnh thành:</label>
                        <Select
                            value={selectedProvince}
                            onChange={handleProvinceChange}
                            options={[
                                { value: 'Hanoi', label: 'Hà Nội' },
                                { value: 'HCM', label: 'Hồ Chí Minh' },
                                { value: 'DN', label: 'Đà Nẵng' },
                                // Thêm các tỉnh thành khác tương ứng với dữ liệu thực của bạn
                            ]}
                        />
                    </div>
                    <div className={cx("addressSelect")}>
                        <label>Chọn cửa hàng:</label>
                        <Select
                            value={selectedStore ? { value: selectedStore.id, label: selectedStore.name } : null}
                            onChange={handleStoreChange}
                            options={storeData.map((store) => ({ value: store.id, label: store.name }))}
                        />
                    </div>
                </div>
                <div className={cx("storeAddress")}>
                    <div className={cx("text")}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className={cx("icon")} />
                        <span>Địa chỉ</span>
                    </div>
                    {selectedStore && (
                        <div className={cx("address")}>
                            <p>Địa chỉ cửa hàng: {selectedStore.address}</p>
                            <p>SĐT/ Zalo: {selectedStore.hotline}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoreLocation;

