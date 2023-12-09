import classNames from "classnames/bind";
import styles from "./CategoryList.module.scss";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import customStyles from "../ProductPages/CustomTable";
import { Modal, Button } from "react-bootstrap";
import { getCategories, deleteCategories, createCategories } from "../../../services/admin/categories";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);

const CategoryList = () => {
  const columns = [
    {
      name: "STT",
      selector: (row) => row.id,
    },
    {
      name: "Loại",
      selector: (row) => row.name,
    },
  ];

  const [categories, setCategories] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [clearSelect, setClearSelect] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const confirmDelete = () => {
    setShowDeleteModal(true);
  };

  useEffect(() => {
    async function getAllCategory() {
      getCategories()
        .then((data) => {
          setCategories(data);
        })
        .catch((error) => console.error("Error fetching categoris list:", error));
    }
    getAllCategory();
    setSelectedRows([]);
  }, []);
  const handleDelete = async () => {
    // Lấy danh sách ID của các sản phẩm đã chọn
    const categoryIdsToDelete = selectedRows.map((row) => row.categoryId);

    try {
      //   console.log(categoryIdsToDelete);
      /* Gọi API để xóa các danh mục
                //const response = await fetch('URL_API_DELETE_CATEGORIES', {
                //    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ categoryIds: categoryIdsToDelete }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }*/

      // Nếu xóa thành công, cập nhật state với danh sách danh mục mới (loại bỏ các danh mục đã chọn)
      await Promise.all(categoryIdsToDelete.map((id) => deleteCategories(id)));
      const updatedCategories = categories.filter((c) => !categoryIdsToDelete.includes(c.categoryId));
      setCategories(updatedCategories);

      // Đặt lại danh sách các danh mục được chọn
      setClearSelect(!clearSelect);
      setSelectedRows([]);
      toast.success("Xóa danh mục thành công!!");
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error.message);
      toast.error("Lôi khi xóa danh mục");
    }
    setShowDeleteModal(false);
  };

  return (
    <div className={cx("wrap")}>
      <div className={cx("cd-category")}>
        <button className={cx("delete-btn")} onClick={confirmDelete}>
          Xóa danh mục sản phẩm
        </button>
        <Link to="/admin/categories/add" className={cx("create-btn")}>
          Thêm danh mục sản phẩm
        </Link>
      </div>

      <div>
        <h3>Danh sách danh mục</h3>
      </div>

      <DataTable
        columns={columns}
        data={categories}
        selectableRows
        fixedHeader
        pagination
        onSelectedRowsChange={({ selectedRows }) => {
          setSelectedRows(selectedRows);
        }}
        customStyles={customStyles}
        clearSelectedRows={clearSelect}
      ></DataTable>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận hủy</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn chắc chắn muốn xóa sản phẩm?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className={cx("btn-close-modal")} style={{ backgroundColor: "#36a2eb" }} onClick={handleCloseDeleteModal}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CategoryList;
