import classNames from "classnames/bind";
import styles from "./ListProductAll.module.scss";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../../services/getAllProduct";
import { useNavigate } from "react-router-dom";
import image from "../../../assets/image/d90581e3850821ba84143a61a01d7fe1.jpeg"
import { ViewProduct, TrackPageView, TrackProductView } from "../../../Tracker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import { setPageType, setEcommerceUser } from '@snowplow/browser-plugin-snowplow-ecommerce';

const cx = classNames.bind(styles);
const ListProductAll = () => {
  const navigateTo = useNavigate();
 /*  const { category_id } = useParams(); */
  const [productList, setProductList] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState(""); // State để lưu trữ loại sắp x
  /* console.log(category_id); */
  useEffect(() => {
    // Gọi hàm lấy danh sách sản phẩm từ server khi component được mount
    getAllProduct()
      .then((data) => {
        // Loại bỏ các sản phẩm có tên trùng lặp
        const uniqueProducts = Array.from(new Set(data.data.map((product) => product.name))).map((name) => data.data.find((product) => product.name === name));
        setProductList(uniqueProducts);
        setOriginalProducts(uniqueProducts)
        /* console.log(category_id); */
        console.log(data);
      })
      .catch((error) => console.error("Error fetching product list:", error));
  }, []);

  
  const uniqueCategories = ["All", ...Array.from(new Set(productList.map((product) => product.categoryName)))];

  const filteredProductList = selectedCategory === "All" ? productList : productList.filter((product) => product.categoryName === selectedCategory);

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


  /* const handleCategoryChange = (event) => {
    
    setSelectedCategory(event.target.value);
    console.log(selectedCategory);
  }; */
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  const sortedProductList = [...productList];
  if (sortBy === "priceAsc") {
    sortedProductList.sort((a, b) => a.price - b.price);
  } else if (sortBy === "priceDesc") {
    sortedProductList.sort((a, b) => b.price - a.price);
  } else if (sortBy === "nameAsc") {
    sortedProductList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "nameDesc") {
    sortedProductList.sort((a, b) => b.name.localeCompare(a.name));
  }
  
  function handleSearch(e) {
    const filterData = originalProducts.filter((product) => {
      return product.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setProductList(filterData);
  }
  



  return (
    
    <div className={cx("productListUser")}>
      {/* <div className={cx("category_name")}>
        <h2></h2>
      </div> */}
      <div className={cx("filter")}>
        {/* <select value={selectedCategory} onChange={handleCategoryChange}>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select> */}
        <select value={sortBy} onChange={handleSortChange}> {/* Thêm dropdown để chọn loại sắp xếp */}
          <option value="">No sorting</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
        </select>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên sản phẩm"
          //value={}
          onChange={handleSearch}
        />
      </div>
      {sortedProductList.map((product) => (
        <div key={product.productId} className={cx("item")}>
          {/* Các trường dữ liệu từ server */}
          <input className="productId" type="text" value={product.productId} disabled style={{ display: "none" }} />
          <input className="category" type="text" value={product.categoryName} disabled style={{ display: "none" }} />
          <div className={cx("imgItem")} onClick={() => redirectToOtherPage(product.productId, product.name, product.price, product.categoryName)}>
            {/* <img src={product.imageUrl} alt={`Item ${product.productId}`} /> */}
            <img src={product.imageUrl} alt={`Item ${product.productId}`} />
            <span><FontAwesomeIcon icon={faCartShopping} /></span>
            {/*<div className={cx("cart-icon")}>
            <FontAwesomeIcon icon="faCartShopping" />
            </div>*/}
          </div>
          <span class={cx("product-vendor")}>NANA SHOP</span>
          <p onClick={() => redirectToOtherPage(product.productId, product.name, product.price, product.categoryName)}>{product.name}</p>
          <span class={cx("price")}>{formatNumber(product.price)}đ</span>
         
        </div>
      ))
      }
    </div >
  );
};

export default ListProductAll;
