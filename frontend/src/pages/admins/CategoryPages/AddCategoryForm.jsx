import React from "react";
import classNames from "classnames/bind";
import styles from "./AddCategory.module.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { Modal, Button } from "react-bootstrap";
import { getCategories, deleteCategories, createCategories } from "../../../services/admin/categories";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
const cx = classNames.bind(styles);

const AddCategoryForm = () => {
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
    navigateTo("/admin/categories");
  };

  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Vui lòng nhập tên danh mục"),
    }),
    onSubmit: (values) => {
      try {
        createCategories(values.categoryName);
        toast.success("Đã thêm danh mục thành công");
        navigateTo("/admin/categories");
      } catch (error) {
        toast.error("Thêm danh mục thất bại");
        console.error("Create categories fails:", error);
      }
      //   console.log(values);
      //navigate('/admin/categories');
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
            navigate('/admin/categories');
        */
  });

  return (
    <div className={cx("container")}>
      <div className={cx("nav")}></div>
      <form action="" method="POST" className={cx("form")} onSubmit={formik.handleSubmit} id={cx("form-1")}>
        <div className={cx("form-group")}>
          <div className={cx("form-input")}>
            <label htmlFor="categoryName" className={cx("form-label")}>
              Tên danh mục<span>*</span>
            </label>
            <input id={cx("categoryName")} name="categoryName" type="text" placeholder="Tên danh mục" value={formik.values.categoryName} onChange={formik.handleChange} className={cx("form-control")} />
            {formik.errors.categoryName && formik.touched.categoryName && <span className={cx("form-message")}>{formik.errors.categoryName}</span>}
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

export default AddCategoryForm;
