import classNames from "classnames/bind";
import styles from "./OrderList.module.scss";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import customStyles from "./CustomTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Image } from "react-bootstrap";
import moment from "moment";
import Numeral from "react-numeral";
import ModalOrderDetail from "./ModalOrderDetail";
import { getDetailOrder, updateOrder } from "../../../services/order";
import { ToastContainer, toast } from "react-toastify";
import { getOrder } from "../../../services/admin/order";
import Chip from '@mui/material/Chip';
const cx = classNames.bind(styles);

const OrderList = () => {
  const columns = [
    {
      name: "Order Id",
      selector: (row) => row.id,
    },
    {
      name: "Tên khách hàng",
      selector: (row) => row.name,
    },
    {
      name: "Địa chỉ",
      selector: (row) => row.address,
    },
    {
      name: "Số điện thoại",
      selector: (row) => row.phone,
    },
    {
      name: "Tổng",
      selector: (row) => (
        <span>
          <Numeral value={row.total} format={"0,0"} /> đ
        </span>
      ),
    },
    {
      name: "Ngày đặt",
      selector: (row) => moment(row.orderDate).format("H:mm DD-MM-YYYY"),
    },
    {
      name: "Trạng thái",
      cell: (row) => <span>{row.status.data[0] === 1 ? <Chip label="Đã hoàn thành" color="success"/> : <Chip label="Chưa hoàn thành" variant="outlined" color="primary"/>}</span>,
    },
  ];
  const [orderList, setOrderList] = useState([]);
  //const navigate = useNavigate()
  useEffect(() => {
    getAllOrder();
  }, []);

  const getAllOrder = async () => {
    getOrder()
      .then((data) => {
        setOrderList(data.data);
      })
      .catch((error) => console.error("Error fetching categoris list:", error));
  };

  // useEffect(() => {
  //   getAllOrder();
  // }, []);
  // const getAllOrder = async () => {
  //   const response = await fetch("http://localhost:3000/order");
  //   console.log(response);
  //   const data = await response.json();
  //   setOrderList(data.data);
  // };

  const getInfoOrder = async (order) => {
    const res = await getDetailOrder(order.id);
    const listProduct = await res.data;
    const orderDetail = {
      ...order,
      items: listProduct,
    };
    setOrderSelected(orderDetail);
    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(false);
  const [orderSelected, setOrderSelected] = useState({});
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleClickOrder = (order) => {
    getInfoOrder(order);
  };
  const handleCompleteOrder = async () => {
    const id = orderSelected.id;

    const res = await updateOrder(1, id);
    if (res.status === true) {
      toast.success("Đã hoàn thành đơn hàng");
      getAllOrder();
      setShowModal(false);
    } else {
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <div className={cx("wrap")}>
      <div className={cx("products-list")}>
        <h3>{"Danh sách đơn hàng"}</h3>
        <DataTable
          columns={columns}
          data={orderList}
          onRowClicked={(row) => {
            handleClickOrder(row);
          }}
          fixedHeader
          pagination
          customStyles={customStyles}
        ></DataTable>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalOrderDetail order={orderSelected} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className={cx("btn-close-modal")} style={{ backgroundColor: "#36a2eb" }} onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="danger" disabled={orderSelected?.status?.data[0] === 0 ? false : true} onClick={handleCompleteOrder}>
            Xác nhận hoàn thành
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderList;
