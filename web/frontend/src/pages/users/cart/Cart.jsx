import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
const cx = classNames.bind(styles);
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListItem, deleteCartItemAction, upCartItemAction, downCartItemAction } from "../../../reactRedux/action/actions";
import ModalCart from "./ModalCart";
import { Await, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContex";
import { getOneProduct1 } from "../../../services/getOneProduct";
const Cart = () => {
  const { user, token } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const listCartItem = useSelector((state) => state.cartList.listCartItems);
  const total = useSelector((state) => state.cartList.count);
  const [showModal, setShowModal] = useState(false);
  let email = "";
  if (user) {
    email = user.email;
    useEffect(() => {
      dispatch(getListItem(email));
    }, []);
  }
  const formatNumber = (number) => {
    // Sử dụng Math.floor để giữ phần nguyên của số
    const integerPart = Math.floor(number);

    // Thêm dấu , giữa mỗi ba chữ số từ bên phải của phần nguyên
    const formattedIntegerPart = integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formattedIntegerPart;
  };

  const handleOnSubmit = (email, productId, size, name, category, price, quantity) => {
    dispatch(deleteCartItemAction(email, productId, size, quantity, price, name, category));
  };
  const handleUpQuantity = async (quantity, email, productId, size) => {
    const res = await getOneProduct1(productId);
    const quantitySize = res.data[0][size];
    if (quantity < quantitySize) dispatch(upCartItemAction(quantity, email, productId, size));
  };
  const handleDownQuantity = (quantity, email, productId, size) => {
    dispatch(downCartItemAction(quantity, email, productId, size));
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleOnclickEmpty = () => {
    navigateTo("/listProduct");
  };
  return (
    <div className={cx("cart")}>
      <h1>Giỏ hàng</h1>
      
      {listCartItem.length > 0 && token ? (
        <div className={cx("cart-body")}>
          <div className={cx("cartItemList")}>
            {listCartItem.map((cartItem, index) => (
              <div key={cartItem.name + cartItem.size} className={cx("product")}>
                <span onClick={() => handleOnSubmit(email, cartItem.productId, cartItem.size, cartItem.name, cartItem.category, cartItem.price, cartItem.quantity)}>x</span>
                <img src={cartItem.imageUrl} alt="#" />
                <div className={cx("infor")}>
                    <p className={cx("name")}>
                      {cartItem.name} <span>{cartItem.size}</span>
                    </p>
                    <p className={cx("price")}>{formatNumber(cartItem.price)} ₫</p>
                    <div className={cx("count")}>
                      <p className={cx("control_minus")} onClick={() => handleDownQuantity(cartItem.quantity, email, cartItem.productId, cartItem.size)}>
                        -
                      </p>
                      <p className={cx("count_select")}>{cartItem.quantity}</p>
                      <p className={cx("control_add")} onClick={() => handleUpQuantity(cartItem.quantity, email, cartItem.productId, cartItem.size)}>
                        +
                      </p>
                    </div>
                   
                </div>
                
              </div>
            ))}
          </div>
          <div className={cx("submit")}>
            <p>
            TỔNG CỘNG <span>{formatNumber(total)} ₫</span>
            </p>
            <button onClick={handleShowModal}>Thanh Toán</button>
            <a href="#" target="_blank" title="Phương thức thanh toán">
		          <img src="https://theme.hstatic.net/1000277297/1001091004/14/footer_trustbadge.png?v=398" alt="#"/>
	        </a>
          </div>
        </div>
      ) : (
        <div className={cx("empty")}>
          <div>
            <img src="https://theme.hstatic.net/1000277297/1001091004/14/cart_empty_background.png?v=244" alt="test" />
          </div>
          <h3>“Hổng” có gì trong giỏ hết</h3>
          <p>Về trang cửa hàng để chọn mua sản phẩm bạn nhé!!</p>
          <button onClick={() => handleOnclickEmpty()}>Quay lại trang chủ</button>
          
        </div>
      )}

      <ModalCart show={showModal} handleClose={() => setShowModal(false)} cartItems={listCartItem} total={total} user={user} />
    </div>
  );
};

export default Cart;
