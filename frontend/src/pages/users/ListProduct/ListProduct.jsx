import classNames from "classnames/bind";
import styles from "./ListProduct.module.scss";

const cx = classNames.bind(styles);
const ListProduct = () => {
  return (
    <div className={cx("productList")}>
      <div style={{ fontSize: "30px" }}>filter</div>
      <div className={cx("item")}>
        <input className="productId" type="text" value="1" disabled style={{ display: "none" }} />
        <input className="category" type="text" value="1" disabled style={{ display: "none" }} />
        <input className="season" type="text" value="1" disabled style={{ display: "none" }} />
        <div className={cx("imgItem")}>
          <img src="https://product.hstatic.net/1000277297/product/311dr11905585__1__78e303e77652496a88ffee0d591f95c0_large.jpg" alt="Item 1" />
          <span>Mua hàng</span>
        </div>
        <p>Description for Item 1</p>
        <span>Cost: $10.00</span>
      </div>
      <div className={cx("item")}>
        <input className="productId" type="text" value="1" disabled style={{ display: "none" }} />
        <input className="category" type="text" value="1" disabled style={{ display: "none" }} />
        <input className="season" type="text" value="1" disabled style={{ display: "none" }} />
        <div className={cx("imgItem")}>
          <img src="https://product.hstatic.net/1000277297/product/311dr11905585__1__78e303e77652496a88ffee0d591f95c0_large.jpg" alt="Item 1" />
          <span>Mua hàng</span>
        </div>
        <p>Description for Item 1</p>
        <span>Cost: $10.00</span>
      </div>
      <div className={cx("item")}>
        <input className="productId" type="text" value="1" disabled style={{ display: "none" }} />
        <input className="category" type="text" value="1" disabled style={{ display: "none" }} />
        <input className="season" type="text" value="1" disabled style={{ display: "none" }} />
        <div className={cx("imgItem")}>
          <img src="https://product.hstatic.net/1000277297/product/311dr11905585__1__78e303e77652496a88ffee0d591f95c0_large.jpg" alt="Item 1" />
          <span>Mua hàng</span>
        </div>
        <p>Description for Item 1</p>
        <span>Cost: $10.00</span>
      </div>
      <div className={cx("item")}>
        <input className="productId" type="text" value="1" disabled style={{ display: "none" }} />
        <input className="category" type="text" value="1" disabled style={{ display: "none" }} />
        <input className="season" type="text" value="1" disabled style={{ display: "none" }} />
        <div className={cx("imgItem")}>
          <img src="https://product.hstatic.net/1000277297/product/311dr11905585__1__78e303e77652496a88ffee0d591f95c0_large.jpg" alt="Item 1" />
          <span>Mua hàng</span>
        </div>
        <p>Description for Item 1</p>
        <span>Cost: $10.00</span>
      </div>
      <div className={cx("item")}>
        <input className="productId" type="text" value="1" disabled style={{ display: "none" }} />
        <input className="category" type="text" value="1" disabled style={{ display: "none" }} />
        <input className="season" type="text" value="1" disabled style={{ display: "none" }} />
        <div className={cx("imgItem")}>
          <img src="https://product.hstatic.net/1000277297/product/311dr11905585__1__78e303e77652496a88ffee0d591f95c0_large.jpg" alt="Item 1" />
          <span>Mua hàng</span>
        </div>
        <p>Description for Item 1</p>
        <span>Cost: $10.00</span>
      </div>
      <div className={cx("item")}>
        <input className="productId" type="text" value="1" disabled style={{ display: "none" }} />
        <input className="category" type="text" value="1" disabled style={{ display: "none" }} />
        <input className="season" type="text" value="1" disabled style={{ display: "none" }} />
        <div className={cx("imgItem")}>
          <img src="https://product.hstatic.net/1000277297/product/311dr11905585__1__78e303e77652496a88ffee0d591f95c0_large.jpg" alt="Item 1" />
          <span>Mua hàng</span>
        </div>
        <p>Description for Item 1</p>
        <span>Cost: $10.00</span>
      </div>
      <div className={cx("item")}>
        <input className="productId" type="text" value="1" disabled style={{ display: "none" }} />
        <input className="category" type="text" value="1" disabled style={{ display: "none" }} />
        <input className="season" type="text" value="1" disabled style={{ display: "none" }} />
        <div className={cx("imgItem")}>
          <img src="https://product.hstatic.net/1000277297/product/311dr11905585__1__78e303e77652496a88ffee0d591f95c0_large.jpg" alt="Item 1" />
          <span>Mua hàng</span>
        </div>
        <p>Description for Item 1</p>
        <span>Cost: $10.00</span>
      </div>
      <div className={cx("item")}>
        <input className="productId" type="text" value="1" disabled style={{ display: "none" }} />
        <input className="category" type="text" value="1" disabled style={{ display: "none" }} />
        <input className="season" type="text" value="1" disabled style={{ display: "none" }} />
        <div className={cx("imgItem")}>
          <img src="https://product.hstatic.net/1000277297/product/311dr11905585__1__78e303e77652496a88ffee0d591f95c0_large.jpg" alt="Item 1" />
          <span>Mua hàng</span>
        </div>
        <p>Description for Item 1</p>
        <span>Cost: $10.00</span>
      </div>
    </div>
  );
};

export default ListProduct;
