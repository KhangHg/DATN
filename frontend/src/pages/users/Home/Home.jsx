import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../services/admin/categories";

const linkCategoryImage = "data:image/png;base64,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";
const cx = classNames.bind(styles);
const Home = () => {
  const [listCategory, setlistcategory] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    async function getAllCategory() {
      getCategories()
        .then((data) => {
          setlistcategory(data);
          console.log(data);
        })
        .catch((error) => console.error("Error fetching categoris list:", error));
    }
    getAllCategory();
  }, []);

  const handleClicks = (categoryId) => {
    Navigate(`/listProduct`);
  };
  return (
    <div className="wrapper">
      <div className={cx("banner")}>
        <img src="https://theme.hstatic.net/1000277297/1001091004/14/slider_1.jpg?v=135" alt="" />
      </div>
      <div className={cx("list-category")}>
        <h1> Danh Mục Sản Phẩm</h1>
        <div className={cx("list-category-content")}>
          {listCategory &&
            listCategory.map((category, index) => (
              <div key={category.categoryId} className={cx("category-item")} onClick={() => handleClicks(category.id)}>
                <img src="./imgaecategory.png" alt="category image" />
                <span className={cx("name")}>{category.name}</span>
              </div>
            ))}
        </div>
      </div>
      <div className={cx("top-new-product")}></div>
    </div>
  );
};

export default Home;
