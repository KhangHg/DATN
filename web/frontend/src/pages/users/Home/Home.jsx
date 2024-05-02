import classNames from "classnames/bind";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Home.module.scss";
import Carousel from 'react-bootstrap/Carousel';

import Slider from "react-slick";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../services/admin/categories";
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
    Navigate(`/listProduct/${categoryId}`);
  };
  const settings = {
    className: "gallery",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    /*autoplay: true,
    autoplaySpeed: 2000,*/
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <div className="wrapper">
      <div className={cx("banner")}>
       
       <Carousel>
        <Carousel.Item>
            <div>
                <img  src="https://theme.hstatic.net/1000277297/1001091004/14/slider_1.jpg?v=135" alt="" />
                    
            </div>
        </Carousel.Item>
        <Carousel.Item>
            <div>
                <img  src="https://theme.hstatic.net/1000277297/1001091004/14/slider_2.jpg?v=135" alt="" />
                    
            </div>
        </Carousel.Item>
        <Carousel.Item>
            <div>
                <img  src="https://theme.hstatic.net/1000277297/1001091004/14/slider_1.jpg?v=393" alt="" />
                    
            </div>
        </Carousel.Item>
        </Carousel>
      </div>
      <div className={cx("list-category")}>
        <h2> Danh mục sản phẩm</h2>
        
        <div className={cx("list-category-content")}>
        <Slider {...settings}>
           {listCategory &&
            listCategory.map((category, index) => (
            
              <div key={category.categoryId} className={cx("category-item")} onClick={() => handleClicks(category.categoryId)}>
                <img src={category.imagecategoryUrl} alt="category image" />
                <span className={cx("name")}>{category.name}</span>
              </div>
             
            ))} 
            {/* <div  className={cx("category-item")} onClick={() => handleClicks(category.id)}>
                <img src="https://theme.hstatic.net/1000277297/1001091004/14/season_coll_2_img_large.png?v=393" alt="category image" />
                <span className={cx("name")}>Ao khoac</span>
            </div>
            <div  className={cx("category-item")} onClick={() => handleClicks(category.id)}>
              <img src="https://theme.hstatic.net/1000277297/1001091004/14/season_coll_2_img_large.png?v=393" alt="category image" />
              <span className={cx("name")}>Ao khoac</span>
            </div>
 */}
          </Slider>
        </div>
        
      </div>
      <div className={cx("top-new-product")}>
          <div className={cx("top-new-heading")}>
            <h2 class={cx("heading-bar__title")}>NANA SHOP</h2>
            <span class={cx("heading-bar__bottom")}>New Arrivals</span>
          </div>
      </div>
    </div>
  );
};

export default Home;
