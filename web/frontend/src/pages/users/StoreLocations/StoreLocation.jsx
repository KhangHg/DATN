import classNames from "classnames/bind";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./StoreLocation.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { getAllAddress } from "../../../services/shopAddress";

const cx = classNames.bind(styles);

const StoreLocation = () => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [storeData, setStoreData] = useState([]);
  const [filteredStoreOptions, setFilteredStoreOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllAddress();
        setStoreData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Lọc danh sách cửa hàng dựa trên tỉnh thành đã chọn
    const filteredStores = storeData.filter((store) => store.province === selectedProvince?.value);
    setFilteredStoreOptions(filteredStores.map((store) => ({ value: store.addressId, label: store.address })));
  }, [selectedProvince, storeData]);

  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
    setSelectedStore(null);
  };

  const handleStoreChange = (selectedOption) => {
    const selectedStoreObject = storeData.find((store) => store.addressId === selectedOption.value);
    setSelectedStore(selectedStoreObject);
  };

  return (
    <div className={cx("storeLocation")}>
      <h2 className={cx("title")}>Hệ thống cửa hàng</h2>
      <div className={cx("container")}>
        <div className={cx("select")}>
          <h5>Tìm cửa hàng</h5>
          <div className={cx("provinceSelect")}>
            <label>Chọn tỉnh thành:</label>
            <Select value={selectedProvince} onChange={handleProvinceChange} options={storeData.map((store) => ({ value: store.province, label: store.province }))} />
          </div>
          <div className={cx("addressSelect")}>
            <label>Chọn cửa hàng:</label>
            <Select value={selectedStore ? { value: selectedStore.addressId, label: selectedStore.address } : null} onChange={handleStoreChange} options={filteredStoreOptions} />
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
              <p>SĐT/ Zalo: {selectedStore.phone}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreLocation;
