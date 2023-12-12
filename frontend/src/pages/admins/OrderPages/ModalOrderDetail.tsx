import React from "react";
import "./ModalOrderDetail.scss";
import { Numeral } from "react-numeral";
import moment from "moment";
import Chip from '@mui/material/Chip';
const ModalOrderDetail = ({ order }) => {
    return (
        <div className="order-container">
            <div className="order-info">
                <p className="order-field"><strong>Email:</strong> {order.email}</p>
                <p className="order-field"><strong>Tên:</strong> {order.name}</p>
                <p className="order-field"><strong>Địa chỉ:</strong> {order.address}</p>
                <p className="order-field"><strong>Điện thoại:</strong> {order.phone}</p>
                <p className="order-field"><strong>Tổng tiền:</strong> {<Numeral
                    value={order.total}
                    format={"0,0"}
                />} đ</p>
                <p className="order-field"><strong>Ngày đặt hàng:</strong> {moment(order.orderDate).format('HH:mm:ss DD-MM-YYYY')} </p>
                <p className="order-field"><strong>Trạng thái:</strong> {order.status?.data[0] === 1 ? <Chip label="Đã hoàn thành" color="success"/> : <Chip label="Chưa hoàn thành" variant="outlined" color="primary"/>}</p>
            </div>
            <div className="order-details">
                <p className="order-header"><strong>Chi tiết sản phẩm:</strong></p>
                <div className="item-list">

                    {order.items.map((item) => (
                        <div key={item.id} className="order-item">
                            <img src={item.imageUrl} alt={item.productName} className="product-image" />
                            <p className="item-field">Tên sản phẩm: {item.productName}</p>
                            <p className="item-field">Giá: {<Numeral
                                value={item.price}
                                format={"0,0"}
                            />} đ</p>
                            <p className="item-field">Số lượng: {item.quantity}</p>
                            <p className="item-field">Kích thước: {item.size}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default ModalOrderDetail;