import classNames from "classnames/bind";
import styles from "./ProductDescription.module.scss";
import React, { useEffect, useState, useContext } from "react";
import { getOneProduct } from "../../../services/getOneProduct";
import { useParams } from "react-router-dom";
import { createCartItemAction } from "../../../reactRedux/action/actions";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../contexts/AuthContex";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { trackAddToCart } from "@snowplow/browser-plugin-snowplow-ecommerce";
import { AddProduct } from "../../../Tracker";
import { number } from "yup";
const cx = classNames.bind(styles);
const ProductDescription = () => {
  const navigateTo = useNavigate();
  const { token, user } = useContext(AuthContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
 
  const [selectedSize, setSelectedSize] = useState("");
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOneProduct(id);
        setProduct(data.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData(); // Gọi hàm lấy dữ liệu khi component được mount

    // Không quên thêm [productId] vào dependencies để useEffect chạy lại khi productId thay đổi
  }, [id]);

  useEffect(() => {
    // Kiểm tra xem có dữ liệu sản phẩm không trước khi thực hiện các thao tác khác
    if (product.length > 0) {
      // Thực hiện các thao tác với dữ liệu sản phẩm ở đây
      const firstProduct = product[0];
      setSelectedSize(firstProduct.sizeName); // Chọn size mặc định
      setQuantity(firstProduct.quantity);
      setPrice(firstProduct.price);
      setImgUrl(firstProduct.imageUrl);
      setDescription(firstProduct.description);
      setCategory(firstProduct.categoryName);
      setName(firstProduct.name)
    }
  }, [product]);

  const [count, setCount] = useState(1);
  const increaseCount = () => {
    if (count < quantity) setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSelectedSize(newSize);

    // Sử dụng hàm setQuantity để cập nhật giá trị của quantity
    const newQuantity = product.find((item) => item.sizeName === newSize)?.quantity || 0;
    setQuantity(newQuantity);
  };

  const formatNumber = (number) => {
    // Sử dụng Math.floor để giữ phần nguyên của số
    const integerPart = Math.floor(number);

    // Thêm dấu , giữa mỗi ba chữ số từ bên phải của phần nguyên
    const formattedIntegerPart = integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formattedIntegerPart;
  };

  const handleCreateItem = () => {
    if (token && user && user.role === "user") {
      const email = user.email;

      dispatch(createCartItemAction(email, id, selectedSize, count, price, name, category));
      toast.success("Sản phẩm đã được thêm vào giỏ hàng của bạn");
    } else {
      navigateTo("/login");
      toast.warn("Đăng nhập trước khi thêm vào giỏ hàng!!");
    }
  };
  return (
    <div className={cx("productDescription", "row")}>
      <input className="productId" type="text" value={id} disabled style={{ display: "none" }} />
      <input className="category" type="text" value={category} disabled style={{ display: "none" }} />
      <div className={cx("divLeft","col-12",  "col-lg-6")}>
        <img src={imgUrl} alt="Item 1" />
      </div>
      <div className={cx("divRight" , "col-xs-12","col-lg-6")}>
        <h3>{name}</h3>
        <span className={cx("product_id_1")}>Mã sản phẩm: <span className={cx("product_id")}>{id}</span></span><br></br>
        <br></br>
        <span className={cx("price")}>{formatNumber(price)}đ</span>
       
        <div className={cx("select")}>
          <label for="cars">Choose a size:</label>

          <select name="size" id="size" onChange={handleSizeChange} value={selectedSize}>
            {product.map((item) => (
              <option key={item.sizeName} value={item.sizeName}>
                {item.sizeName}
              </option>
            ))}
          </select>

          <p>Số lượng: {quantity}</p>
        </div>
        <div className={cx("add_to_cart")}>
          <div className={cx("count")}>
            <p className={cx("control_minus")} onClick={decreaseCount}>
              -
            </p>
            <p className={cx("count_select")}>{count}</p>
            <p className={cx("control_add")} onClick={increaseCount}>
              +
            </p>
          </div>

          <div onClick={() => handleCreateItem()} className={cx("addCart")}>
            <p>Thêm vào giỏ</p>
          </div>
        </div>

        <div className={cx("product_describe")}>
          <div className={cx("product_describe_head")}>
            <h5>Mô tả sản phẩm</h5>
          </div>
          <div className={cx("product_describe_body")}>
              <p style={{
              fontWeight: 100,
              fontSize: '14px'
            }}
            >
              {description}
            </p>
          </div>

        </div>
        
      </div>
    </div>
    //<div>Hello my friend</div>
  );
};

export default ProductDescription;
