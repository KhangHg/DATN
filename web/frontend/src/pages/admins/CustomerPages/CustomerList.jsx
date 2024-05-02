import classNames from "classnames/bind";
import styles from "./CustomerList.module.scss";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import customStyles from "./CustomTableCustomer";
import { useNavigate } from "react-router-dom";
import { getAllCustomer, deleteCustomer } from "../../../services/admin/customer";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

const cx = classNames.bind(styles);

const CustomerList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalUsers, setOriginalUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState(0);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const confirmDelete = (id) => {
    setShowDeleteModal(true);
    setDeleteUser(id);
  };

  useEffect(() => {
    async function getCustomer() {
      try {
        const data = await getAllCustomer();
        setUsers(data);
        setOriginalUsers(data);
      } catch (error) {
        console.error("Error fetching customer list:", error);
      }
    }
    getCustomer();
  }, []);

  const columns = [
    {
      name: "Tên",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Số điện thoại",
      selector: (row) => row.phone,
    },
    {
      name: "",
      cell: (row) => <FontAwesomeIcon icon={faTrashAlt} style={{ cursor: "pointer", color: "red" }} onClick={() => confirmDelete(row.customerId)} />,
    },
  ];

  const handleDelete = async () => {
    try {
      await deleteCustomer(deleteUser);
      const updatedUsers = users.filter((user) => user.customerId !== deleteUser);
      setUsers(updatedUsers);
      setOriginalUsers(updatedUsers);
      toast.success("Xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa khách hàng:", error.message);
      toast.error("Lỗi khi xóa khách hàng");
    }
    setShowDeleteModal(false);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm === "") {
      setUsers(originalUsers);
      return;
    }

    const filteredUsers = originalUsers.filter((user) => user.email.toLowerCase().includes(searchTerm.toLowerCase()));
    setUsers(filteredUsers);
  };

  return (
    <div>
      <h3>Danh sách khách hàng</h3>
      <div className={cx("userList")}>
        <input type="text" placeholder="Tìm kiếm theo email" value={searchTerm} onChange={handleSearch} />
        <DataTable columns={columns} data={users} fixedHeader pagination customStyles={customStyles} />
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận hủy</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn chắc chắn muốn xóa khách hàng?</Modal.Body>
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
    </div>
  );
};

export default CustomerList;
