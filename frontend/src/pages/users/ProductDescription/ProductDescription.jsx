import classNames from "classnames/bind";
import styles from "./ProductDescription.module.scss";
import React, { useState } from "react";

const cx = classNames.bind(styles);
const ProductDescription = () => {
  const [count, setCount] = useState(1);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  return (
    <div className={cx("productDescription")}>
      <input className="productId" type="text" value="1" disabled style={{ display: "none" }} />
      <input className="category" type="text" value="1" disabled style={{ display: "none" }} />
      <input className="season" type="text" value="1" disabled style={{ display: "none" }} />
      <div classNames={cx("divLeft")}>
        <img src="https://product.hstatic.net/1000277297/product/311dr11905585__1__78e303e77652496a88ffee0d591f95c0_large.jpg" alt="Item 1" />
      </div>
      <div className={cx("divRight")}>
        <p>Description for Item 1</p>
        <span>Cost: $10.00</span>
        <div className={cx("select")}>
          <label for="cars">Choose a size:</label>

          <select name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>

        <div className={cx("count")}>
          <p className={cx("control")} onClick={decreaseCount}>
            -
          </p>
          <p>{count}</p>
          <p className={cx("control")} onClick={increaseCount}>
            +
          </p>
        </div>

        <div className={cx("addCart")}>
          <p>Thêm vào giỏ</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
