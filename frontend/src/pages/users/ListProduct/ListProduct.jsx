import classNames from "classnames/bind";
import styles from "./ListProduct.module.scss";
import { useEffect, useState } from "react";
import { getProductList } from "../../../services/getProductList";
import { useNavigate } from "react-router-dom";
import image from "../../../assets/image/d90581e3850821ba84143a61a01d7fe1.jpeg"
import { ViewProduct, TrackPageView, TrackProductView } from "../../../Tracker";
import { setPageType, setEcommerceUser } from '@snowplow/browser-plugin-snowplow-ecommerce';

const cx = classNames.bind(styles);
const ListProduct = () => {
  const navigateTo = useNavigate();
  const [productList, setProductList] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    // Gọi hàm lấy danh sách sản phẩm từ server khi component được mount
    getProductList()
      .then((data) => {
        // Loại bỏ các sản phẩm có tên trùng lặp
        const uniqueProducts = Array.from(new Set(data.data.map((product) => product.name))).map((name) => data.data.find((product) => product.name === name));
        setProductList(uniqueProducts);
        setOriginalProducts(uniqueProducts)
      })
      .catch((error) => console.error("Error fetching product list:", error));
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const uniqueCategories = ["all", ...Array.from(new Set(productList.map((product) => product.categoryName)))];

  const filteredProductList = selectedCategory === "all" ? productList : productList.filter((product) => product.categoryName === selectedCategory);

  const formatNumber = (number) => {
    // Sử dụng Math.floor để giữ phần nguyên của số
    const integerPart = Math.floor(number);

    // Thêm dấu , giữa mỗi ba chữ số từ bên phải của phần nguyên
    const formattedIntegerPart = integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formattedIntegerPart;
  };

  const redirectToOtherPage = (productId, productName, productPrice, categoryName) => {
    // Điều hướng đến trang khác với productId hoặc bất kỳ thông tin nào bạn muốn chuyển đi
    navigateTo(`/productDescription/${productId}`);
    ViewProduct(productName, Number(productPrice), String(productId), categoryName)
    // TrackProductView(productName, Number(productPrice), String(productId), categoryName)
  };

  function handleSearch(e) {
    const filterData = originalProducts.filter((product) => {
      return product.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setProductList(filterData);
  }



  return (
    <div className={cx("productListUser")}>
      <div className={cx("filter")}>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên sản phẩm"
          //value={}
          onChange={handleSearch}
        />
      </div>
      {filteredProductList.map((product) => (
        <div key={product.productId} className={cx("item")}>
          {/* Các trường dữ liệu từ server */}
          <input className="productId" type="text" value={product.productId} disabled style={{ display: "none" }} />
          <input className="category" type="text" value={product.categoryName} disabled style={{ display: "none" }} />
          <div className={cx("imgItem")} onClick={() => redirectToOtherPage(product.productId, product.name, product.price, product.categoryName)}>
            {/* <img src={product.imageUrl} alt={`Item ${product.productId}`} /> */}
            <img src={image} alt={`Item ${product.productId}`} />
            <span>Mua hàng</span>
          </div>
          <p onClick={() => redirectToOtherPage(product.productId, product.name, product.price, product.categoryName)}>{product.name}</p>
          <span>{formatNumber(product.price)}đ</span>
        </div>
      ))
      }
    </div >
  );
};

export default ListProduct;
