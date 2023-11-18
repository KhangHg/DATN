import classNames from "classnames/bind";
import styles from "./Home.module.scss"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
const listcategoryFake = [
  {
    id:1,
    name: "Áo khoác - Blazers",
    img:"https://theme.hstatic.net/1000277297/1001091004/14/season_coll_1_img_large.png?v=135",
    numProduct:20
  },
  {
    id:2,
    name: "Áo khoác - Blazers",
    img:"https://theme.hstatic.net/1000277297/1001091004/14/season_coll_1_img_large.png?v=135",
    numProduct:20
  },
  {
    id:3,
    name: "Áo khoác - Blazers",
    img:"https://theme.hstatic.net/1000277297/1001091004/14/season_coll_1_img_large.png?v=135",
    numProduct:20
  },  
  {
    id:4,
    name: "Áo khoác - Blazers",
    img:"https://theme.hstatic.net/1000277297/1001091004/14/season_coll_1_img_large.png?v=135",
    numProduct:20
  },  
  {
    id:5,
    name: "Áo khoác - Blazers",
    img:"https://theme.hstatic.net/1000277297/1001091004/14/season_coll_1_img_large.png?v=135",
    numProduct:20
  },
  {
    id:6,
    name: "Áo khoác - Blazers",
    img:"https://theme.hstatic.net/1000277297/1001091004/14/season_coll_1_img_large.png?v=135",
    numProduct:20
  }
]
const Home = () => {
  const [listCategory, setlistcategory] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      console.log(data);
      setlistcategory(listcategoryFake);
    }
    fetchData();
  }, []);

  const handleClicks = (categoryId) =>{
    Navigate(`https://www.youtobe.com/${categoryId}`)
  }
    return (
        <div class="wrapper">
          <div className={cx("banner")}>
            <img src="https://theme.hstatic.net/1000277297/1001091004/14/slider_1.jpg?v=135" alt="" />
          </div>
          <div className={cx("list-category")}>
            <h1> Danh Mục Sản Phẩm</h1>
            <div className={cx("list-category-content")}>
            {listCategory.map((category, index) => (
              <div key={ category.id } className={cx("category-item")} onClick={() => handleClicks(category.id)}> 
                <img src={category.img} alt="" />
                <span className={cx("name")}>{category.name}</span>
                <span className={cx("number-product")}>{category.numProduct} Sản phẩm</span>
              </div>
            ))}
            </div>
          </div>
          <div className={cx("top-new-product")}>

          </div>
        </div>
    )
}

export default Home;