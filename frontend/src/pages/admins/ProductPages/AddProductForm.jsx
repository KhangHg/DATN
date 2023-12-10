//import React from "react";
import classNames from "classnames/bind";
import styles from "./AddProductForm.module.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { Modal, Button } from "react-bootstrap";
import { getCategories } from "../../../services/admin/categories";
import * as Yup from "yup";
import { createProduct } from "../../../services/admin/products";
import { toast, ToastContainer } from "react-toastify";

const cx = classNames.bind(styles);
export const categoriesFake = [
  {
    categoryId: 1,
    categoryName: "Áo",
  },
  {
    categoryId: 2,
    categoryName: "Quần",
  },
  {
    categoryId: 3,
    categoryName: "Khăn",
  },
];

const AddProductForm = () => {
  const navigateTo = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      categoryName: "",
      S: "",
      M: "",
      L: "",
      XL: "",
      XXL: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Bạn chưa điền tên sản phẩm!"),
      description: Yup.string().required("Bạn chưa thêm mô tả cho sản phẩm"),
      price: Yup.string().required("Bạn chưa nhập giá cho sản phẩm"),
      imageUrl: Yup.string().required("Bạn chưa thêm ảnh minh họa cho sản phẩm"),
      categoryName: Yup.string().required("Bạn chưa thêm danh mục cho sản phẩm"),
      S: Yup.number().integer("Số lượng phải là số nguyên").min(0, "Số lượng không âm").required("Nhập số lượng sản phẩm"),
      M: Yup.number().integer("Số lượng phải là số nguyên").min(0, "Số lượng không âm").required("Nhập số lượng sản phẩm"),
      L: Yup.number().integer("Số lượng phải là số nguyên").min(0, "Số lượng không âm").required("Nhập số lượng sản phẩm"),
      XL: Yup.number().integer("Số lượng phải là số nguyên").min(0, "Số lượng không âm").required("Nhập số lượng sản phẩm"),
      XXL: Yup.number().integer("Số lượng phải là số nguyên").min(0, "Số lượng không âm").required("Nhập số lượng sản phẩm"),
    }),

    onSubmit: (values) => {
      try {
        createProduct(values).then((data) => {
          if (data && data.errCode === 0) {
            toast.success("Đã thêm sản phẩm thành công");
            navigateTo("/admin/products");
          } else if (data && data.errCode === 1) {
            toast.error("Sản phẩm đã tồn tại");
          }
        });
      } catch (error) {
        toast.error("Thêm sản phẩm thất bại");
        console.error("Create product fails:", error);
      }
    },
  });

  const [categories, setCategories] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();

  const handleCloseCancelModal = () => setShowCancelModal(false);
  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    // Thực hiện hành động hủy tạo category ở đây
    setShowCancelModal(false);
    navigate("/admin/products");
  };

  useEffect(() => {
    //get all category
    async function getAllCategory() {
      try {
        const data = await getCategories();
        //console.log(data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching product by id:", error);
      }
    }
    getAllCategory();
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("nav")}>
        <Link to="/admin/products" className={cx("back")}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ paddingRight: "10px" }} />
          Quay lại danh sách sản phẩm
        </Link>
      </div>

      <form action="" method="POST" className={cx("form")} onSubmit={formik.handleSubmit} id={cx("form-1")}>
        <h3 className={cx("info")}>Thông tin sản phẩm</h3>

        <div className={cx("spacer")}></div>
        <div className={cx("form-body")}>
          <div className={cx("form-group")}>
            <div className={cx("form-input")}>
              <label htmlFor="name" className={cx("form-label")}>
                Tên sản phẩm<span> *</span>
              </label>
              <input id="name" name="name" type="text" placeholder="Tên sản phẩm" value={formik.values.name} onChange={formik.handleChange} className={cx("form-control")} />
              {formik.errors.name && formik.touched.name && <span className={cx("form-message")}>{formik.errors.name}</span>}
            </div>

            <div className={cx("form-input")}>
              <label htmlFor="description" className={cx("form-label")}>
                Mô tả sản phẩm<span> *</span>
              </label>
              <textarea id="description" name="description" placeholder="Mô tả sản phẩm" value={formik.values.description} rows="4" onChange={formik.handleChange} className={cx("form-control")} />
              {formik.errors.description && formik.touched.description && <span className={cx("form-message")}>{formik.errors.description}</span>}
            </div>

            <div className={cx("form-input")}>
              <label htmlFor="price" className={cx("form-label")}>
                Giá bán<span> *</span>
              </label>
              <input id="price" name="price" type="text" placeholder="nhập giá" value={formik.values.price} onChange={formik.handleChange} className={cx("form-control")} />
              {formik.errors.price && formik.touched.price && <span className={cx("form-message")}>{formik.errors.price}</span>}
            </div>

            <div className={cx("form-input")}>
              <label htmlFor="imageUrl" className={cx("form-label")}>
                Url ảnh mẫu<span> *</span>
              </label>
              <input id="imageUrl" name="imageUrl" type="text" placeholder="Nhập link ảnh sản phẩm" value={formik.values.imageUrl} onChange={formik.handleChange} className={cx("form-control")} />
              {formik.values.imageUrl && (
                <div className={cx("imageArea")}>
                  <p>Ảnh mẫu sản phẩm</p>
                  <img style={{ width: "240px", height: "300px" }} src={formik.values.imageUrl}></img>
                </div>
              )}
              {formik.errors.imageUrl && formik.touched.imageUrl && <span className={cx("form-message")}>{formik.errors.imageUrl}</span>}
            </div>
          </div>

          <div className={cx("form-group")}>
            <div className={cx("form-input2")}>
              <label htmlFor="categoryName" className={cx("form-label")}>
                Danh mục:<span> * &nbsp;</span>
              </label>
              <select id={cx("categoryName")} name="categoryName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.categoryName || ""}>
                <option>Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              {formik.errors.categoryName && formik.touched.categoryName && (
                <span className={cx("form-message")}>
                  <br></br>
                  {formik.errors.categoryName}
                </span>
              )}
            </div>
            <div className={cx("form-input2")} id={cx("size")}>
              {["S", "M", "L", "XL", "XXL"].map((item, key) => (
                <div key={key} className={cx("size-input")}>
                  <label htmlFor={`${item}`} className={cx("size-label")}>
                    Size {item}
                  </label>
                  <input id={`${item}`} name={`${item}`} type="number" placeholder="Số sản phẩm" value={formik.values[`${item}`]} onChange={formik.handleChange} className={cx("form-control")} />
                  {formik.errors[`${item}`] && formik.touched[`${item}`] && <span className={cx("form-message")}>{formik.errors[`${item}`]}</span>}
                </div>
              ))}
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
        </div>
      </form>
      <Modal show={showCancelModal} onHide={handleCloseCancelModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận hủy</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn hủy tạo sản phẩm mới không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className={cx("btn-close-modal")} style={{ backgroundColor: "#36a2eb" }} onClick={handleCloseCancelModal}>
            Đóng
          </Button>
          <Button variant="danger" onClick={handleConfirmCancel}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddProductForm;
