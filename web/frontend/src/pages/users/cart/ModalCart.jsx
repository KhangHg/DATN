import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./modalCart.scss";
import axios from "axios";
import { createOrder } from "../../../services/order";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { createOrderAction } from "../../../reactRedux/action/actions";
import { subProduct } from "../../../services/user/subProduct";
// Define formatNumber function here or import it if it's defined elsewhere

const ModalCart = ({ show, handleClose, cartItems, total, user }) => {
  const dispatch = useDispatch();
  const formatNumber = (number) => {
    // Sử dụng Math.floor để giữ phần nguyên của số
    const integerPart = Math.floor(number);

    // Thêm dấu , giữa mỗi ba chữ số từ bên phải của phần nguyên
    const formattedIntegerPart = integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formattedIntegerPart;
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
    const selectedCityName = e.target.value;
    setSelectedCity(selectedCityName);

    // Filter districts based on the selected city
    const selectedCityData = cities.find((city) => city.Name === selectedCityName);
    setDistricts(selectedCityData ? selectedCityData.Districts : []);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictName = e.target.value;
    setSelectedDistrict(selectedDistrictName);

    // Filter wards based on the selected district
    const selectedDistrictData = districts.find((district) => district.Name === selectedDistrictName);
    setWards(selectedDistrictData ? selectedDistrictData.Wards : []);
    setSelectedWard("");
  };
  const handleWardChange = (e) => {
    const selectedWardName = e.target.value;
    setSelectedWard(selectedWardName);
  };
  const updateQuantityInAPI = async (cartItem) => {
    for (const item of cartItem) {
      //console.log(item.name, item.size, item.quantity);
      // Gọi hàm subProduct cho mỗi phần tử trong cartItem
      await subProduct(item.name, item.size, item.quantity);
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: user ? user.email : "",
    address: "",
    citi: "",
    district: "",
    ward: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    ward: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear any previous errors for the current field
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...formErrors };

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Tên không được để trống";
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
      isValid = false;
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống";
      isValid = false;
    }

    // Validate address
    if (!formData.address.trim()) {
      newErrors.address = "Địa chỉ không được để trống";
      isValid = false;
    }

    // Validate city
    if (!selectedCity) {
      newErrors.city = "Vui lòng chọn tỉnh thành";
      isValid = false;
    }

    // Validate district
    if (!selectedDistrict) {
      newErrors.district = "Vui lòng chọn quận huyện";
      isValid = false;
    }

    // Validate ward
    if (!selectedWard) {
      newErrors.ward = "Vui lòng chọn phường xã";
      isValid = false;
    }

    setFormErrors(newErrors);

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Dữ liệu cần truyền đi
      const formDataToSend = {
        name: formData.name,
        email: user.email,
        phone: formData.phone,
        address: `${selectedCity}, ${selectedDistrict}, ${selectedWard}, ${formData.address}`,
        status: 0,
        items: cartItems,
        total: total,
      };
      console.log(formDataToSend.items);
      updateQuantityInAPI(cartItems)
        .then(() => console.log("Cập nhật số lượng sản phẩm thành công"))
        .catch((error) => console.error("Lỗi khi cập nhật số lượng sản phẩm:", error));
      // Handle form submission, you can send the formDataToSend to an API, dispatch an action, etc.
      dispatch(createOrderAction(formDataToSend.email, formDataToSend.name, formDataToSend.phone, formDataToSend.status, formDataToSend.address, formDataToSend.total, formDataToSend.items));
      toast.success("Cảm ơn bạn đã mua hàng!! Nhân viên sẽ gọi lại để xác nhận với khách hàng.");
      handleClose();
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Thông tin thanh toán</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="listItem">
            <h3>Tên các sản phẩm:</h3>
            {cartItems.map((cartItem) => (
              <div key={cartItem.name + cartItem.size} className="item">
                <p>{cartItem.description}</p>
                <p>Size: {cartItem.size}</p>
                <p>Số lượng: {cartItem.quantity}</p>
              </div>
            ))}
            <h2>Total: {formatNumber(total)} đ</h2>
          </div>
          <div className="address">
            <h3>Thông tin địa chỉ</h3>
            <form className="form">
              <div>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Username" required />
              </div>
              <div className="emailInput">
                <input type="email" id="email" name="email" value={formData.email} required />
              </div>
              <div className="phoneInput">
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Số điện thoại" required />
              </div>
              <div>
                <input id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Địa chỉ nhà cụ thể" required />
              </div>
              <div>
                <select value={selectedCity} onChange={handleCityChange} style={{ display: "inline-block", background: "white", color: "black", padding: "10px 10px" }}>
                  <option value="" disabled selected>
                    Chọn tỉnh thành
                  </option>
                  {cities.map((city) => (
                    <option key={city.Id} value={city.Name}>
                      {city.Name}
                    </option>
                  ))}
                </select>

                <select value={selectedDistrict} onChange={handleDistrictChange} style={{ display: "inline-block", background: "white", color: "black", padding: "10px 10px" }}>
                  <option value="" disabled selected>
                    Chọn quận huyện
                  </option>
                  {districts.map((district) => (
                    <option key={district.Id} value={district.Name}>
                      {district.Name}
                    </option>
                  ))}
                </select>

                <select value={selectedWard} onChange={handleWardChange} style={{ display: "inline-block", background: "white", color: "black", padding: "10px 10px" }}>
                  <option value="" disabled selected>
                    Chọn phường xã
                  </option>
                  {wards.map((ward) => (
                    <option key={ward.Id} value={ward.Name}>
                      {ward.Name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ color: "red" }}>
                {formErrors.name && <p>{formErrors.name}</p>}
                {formErrors.email && <p>{formErrors.email}</p>}
                {formErrors.phone && <p>{formErrors.phone}</p>}
                {formErrors.address && <p>{formErrors.address}</p>}
                {formErrors.city && <p>{formErrors.city}</p>}
                {formErrors.district && <p>{formErrors.district}</p>}
                {formErrors.ward && <p>{formErrors.ward}</p>}
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Thanh toán
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCart;
