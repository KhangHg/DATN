import classNames from "classnames/bind";
import styles from "./AddStoreForm.module.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useFormik } from "formik";
import { Modal, Button } from "react-bootstrap";
import * as Yup from "yup";
import { getAddress, deleteAddress, createAddress } from "../../../services/admin/addressShop";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

export const AddStoreForm = () => {
  const navigateTo = useNavigate();

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleShowErrorModal = () => setShowErrorModal(true);
  const [errorText, setErrorText] = useState("");
  const handleCloseCancelModal = () => setShowCancelModal(false);

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    // Thực hiện hành động hủy tạo category ở đây
    setShowCancelModal(false);
    navigateTo("/admin/stores");
  };

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    const selectedCityData = cities.find((city) => city.Name === cityName);
    setDistricts(selectedCityData ? selectedCityData.Districts : []);
    formik.setFieldValue("city", cityName);
    formik.setFieldValue("district", "");
    formik.setFieldValue("ward", "");
  };
  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    const selectedDistrictData = districts.find((district) => district.Name === districtName);
    setWards(selectedDistrictData ? selectedDistrictData.Wards : []);
    formik.setFieldValue("district", districtName);
    formik.setFieldValue("ward", "");
  };
  const handleWardChange = (e) => {
    const wardName = e.target.value;
    formik.setFieldValue("ward", wardName);
  };

  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      district: "",
      ward: "",
      hotline: "",
    },
    validationSchema: Yup.object({
      address: Yup.string().required("Vui lòng nhập địa chỉ (số nhà, đường/ thôn)"),
      city: Yup.string().required("Bạn chưa chọn tỉnh/ thành phố"),
      district: Yup.string().required("Bạn chưa chọn quận/huyện"),
      ward: Yup.string().required("Bạn chưa chọn phường/xã"),
      hotline: Yup.string().required("Vui lòng nhập số điện thoại của cửa hàng"),
    }),
    onSubmit: (values) => {
      const dataToSend = {
        name: values.address,
        province: values.city,
        address: `${values.address}, ${values.ward}, ${values.district}, ${values.city}`,
        hotline: values.hotline,
      };
      try {
        createAddress(dataToSend.province, dataToSend.address, dataToSend.hotline);
        toast.success("Đã thêm địa chỉ thành công");
        navigateTo("/admin/stores");
      } catch (error) {
        toast.error("Thêm địa chỉ thất bại");
        console.error("Create categories fails:", error);
      }
      console.log(dataToSend);
      navigateTo('/admin/stores');
    },
    //call api trong onsubmit
    /*async (values) => {
            try {
                const res = await fetch("");
                ...
                res.error && setErrorText(res.error); 
                handleShowErrorModal(); //Show model thông báo lỗi
            }catch(error){
            }}
            navigate('/admin/stores');
        */
  });

  return (
    <div className={cx("container")}>
      <div className={cx("nav")}>
        <Link to="/admin/stores" className={cx("back")}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ paddingRight: "10px" }} />
          Quay lại danh sách cửa hàng
        </Link>
      </div>
      <form action="" method="POST" className={cx("form")} onSubmit={formik.handleSubmit} id={cx("form-1")}>
        <div className={cx("form-group")}>
          <div className={cx("slt")}>
            <div>
              <select value={formik.values.city} onChange={handleCityChange}>
                <option value="" disabled>
                  Chọn tỉnh thành
                </option>
                {cities.map((city) => (
                  <option key={city.Id} value={city.Name}>
                    {city.Name}
                  </option>
                ))}
              </select>
              {formik.errors.city && formik.touched.city && (
                <span className={cx("form-message")}>
                  <br></br>
                  {formik.errors.city}
                </span>
              )}
            </div>
            <div>
              <select value={formik.values.district} onChange={handleDistrictChange}>
                <option value="" disabled>
                  Chọn quận huyện
                </option>
                {districts.map((district) => (
                  <option key={district.Id} value={district.Name}>
                    {district.Name}
                  </option>
                ))}
              </select>
              {formik.errors.district && formik.touched.district && (
                <span className={cx("form-message")}>
                  <br></br>
                  {formik.errors.district}
                </span>
              )}
            </div>
            <div>
              <select value={formik.values.ward} onChange={handleWardChange}>
                <option value="" disabled>
                  Chọn phường xã
                </option>
                {wards.map((ward) => (
                  <option key={ward.Id} value={ward.Name}>
                    {ward.Name}
                  </option>
                ))}
              </select>
              {formik.errors.ward && formik.touched.ward && (
                <span className={cx("form-message")}>
                  <br></br>
                  {formik.errors.ward}
                </span>
              )}
            </div>
          </div>

          <div className={cx("form-input")}>
            <label htmlFor="address" className={cx("form-label")}>
              Địa chỉ cụ thể<span>*</span>
            </label>
            <input id={cx("address")} name="address" type="text" placeholder="Số nhà, tên đường" value={formik.values.address} onChange={formik.handleChange} className={cx("form-control")} />
            {formik.errors.address && formik.touched.address && <span className={cx("form-message")}>{formik.errors.address}</span>}
          </div>
          <div className={cx("form-input")}>
            <label htmlFor="hotline" className={cx("form-label")}>
              Số điện thoại<span>*</span>
            </label>
            <input id={cx("hotline")} name="hotline" type="text" placeholder="Số điện thoại" value={formik.values.hotline} onChange={formik.handleChange} className={cx("form-control")} />
            {formik.errors.hotline && formik.touched.hotline && <span className={cx("form-message")}>{formik.errors.hotline}</span>}
          </div>

          <div className={cx("btn")}>
            <button className={cx("cancel")} onClick={handleCancel}>
              Hủy
            </button>
            <button className={cx("form-submit")} type="submit" value="Submit Form">
              Tạo
            </button>
          </div>
        </div>
      </form>

      <Modal show={showCancelModal} onHide={handleCloseCancelModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận hủy</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn hủy tạo danh mục sản phẩm không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className={cx("btn-close-modal")} style={{ backgroundColor: "#36a2eb" }} onClick={handleCloseCancelModal}>
            Đóng
          </Button>
          <Button variant="danger" onClick={handleConfirmCancel}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Lỗi khi thêm danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>Đã xảy ra lỗi:{errorText}. Vui lòng nhập lại</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
