import classNames from "classnames/bind";
import styles from "./CustomerList.module.scss";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import customStyles from "./CustomTableCustomer";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const CustomerList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalUsers, setOriginalUsers] = useState([]); // Thêm state cho danh sách người dùng gốc

  useEffect(() => {
    // Lấy dữ liệu người dùng hoặc thiết lập ở đây
    const userData = [
      {
        customerId: 1,
        name: "nghia",
        email: "dankkingmeo2@gmail.com",
        phone: 1234567890,
        password: "2323234234",
        role: "user",
      },
      {
        customerId: 2,
        name: "nghia2",
        email: "dankkingmeo212@gmail.com",
        phone: 1234567890,
        password: "2323234234",
        role: "user",
      },
      {
        customerId: 3,
        name: "Nguyễn Xuân Thành",
        email: "nminhnghia113@gmail.com",
        phone: 2147483647,
        password: "123456789",
        role: "user",
      },
      {
        customerId: 4,
        name: "nguyen",
        email: "nghanm113@gmail.com",
        phone: 123456789,
        password: "123456789",
        role: "user",
      },
      {
        customerId: 5,
        name: "minh234",
        email: "nam2@gmail.com",
        phone: 123456789,
        password: "123456789",
        role: "user",
      },
      {
        customerId: 6,
        name: "Nguyễn Minh Nghĩa",
        email: "nghanm1134@gmail.com",
        phone: 2147483647,
        password: "123456789",
        role: "user",
      },
      {
        customerId: 7,
        name: "Nguyễn Minh Nghĩa",
        email: "dankkingmeo2333@gmail.com",
        phone: 123456789,
        password: "123456789",
        role: "user",
      },
      {
        customerId: 8,
        name: "nghia2",
        email: "dankkingmeo2122@gmail.com",
        phone: 1234567890,
        password: "2323234234",
        role: "admin",
      },
    ];
    setUsers(userData);
    setOriginalUsers(userData); // Lưu danh sách người dùng gốc
  }, []); // Mảng phụ thuộc trống để lấy dữ liệu chỉ một lần

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
      cell: (row) => <FontAwesomeIcon icon={faTrashAlt} style={{ cursor: "pointer" }} onClick={() => handleDelete(row.customerId)} />,
    },
  ];

  const handleDelete = (customerId) => {
    console.log(`Xóa khách hàng với ID: ${customerId}`);
    // Thêm logic xóa dữ liệu khách hàng ở đây
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Nếu từ khóa tìm kiếm rỗng, đặt lại danh sách ban đầu
    if (searchTerm === "") {
      setUsers(originalUsers);
      return;
    }

    // Ngược lại, lọc dữ liệu dựa trên từ khóa tìm kiếm
    const filteredUsers = originalUsers.filter((user) => user.email.toLowerCase().includes(searchTerm.toLowerCase()));

    // Cập nhật dữ liệu hiển thị trong DataTable
    setUsers(filteredUsers);
  };

  return (
    <div>
      <h3>Danh sách khách hàng</h3>
      <div className={cx("userList")}>
        <input type="text" placeholder="Tìm kiếm theo email" value={searchTerm} onChange={handleSearch} />
        <DataTable columns={columns} data={users} selectableRows fixedHeader pagination customStyles={customStyles} />
      </div>
    </div>
  );
};

export default CustomerList;
