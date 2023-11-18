import classNames from "classnames/bind";
import styles from "./Product.module.scss"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

const listProduct = [
        {
          id: 100,
          name:"Áo khóac đen",
          price:100000,
          image:"linkimgae",
          // ...
        },
        {
          id: 101,
          name:"Áo khóac trắng",
          price:100000,
          image:"linkimgae",
          // ...
        },
        {
          id: 110,
          name:"Áo khóac đen",
          price:100000,
          image:"linkimgae",
          // ...
        },
        {
          id: 111,
          name:"Áo khóac trắng",
          price:100000,
          image:"linkimgae",
          // ...
        },
  ];
  const categoryFake = 
    {
      id:1,
      name:"Áo khoác",
      product_list: [
        {
          id: 100,
          name:"Áo khóac đen",
          price:100000,
          image:"linkimgae",
          // ...
        },
        {
          id: 101,
          name:"Áo khóac trắng",
          price:100000,
          image:"linkimgae",
          // ...
        },
      ]
    }
const Product = () => {
    const [productList, setProductList] = useState([]);
    const [category, setCategory] = useState({});
    const {categoryId} = useParams();
    console.log(categoryId);
    useEffect(() => {
        //get all products
        async function getAllProduct() {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await response.json();
            console.log(data);
            setProductList(listProduct);
        }
        getAllProduct();


        //get products of category
        async function getProductCategory() {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await response.json();
            console.log(data);
            
            setCategory(categoryFake);
            setProductList(listProduct);
            
        }
        if (categoryId !== undefined) {getProductCategory()} else setCategory({})
        console.log(categoryId);
      }, [categoryId]);
      const handleClicks = (productId) =>{
        Navigate(`https://www.youtobe.com/${productId}`)
      }
    return (
        <div>
            <h1>
                {category.name != null ? category.name :'Tất cả sản phẩm'}
            </h1>
            <div className={cx("list-category-content")}>
            {productList.map((product, index) => (
              <div key={ product.id } className={cx("product-item")} onClick={() => handleClicks(product.id)}> 
                <img src={product.img} alt="" />
                <span className={cx("name")}>{product.name}</span>
                <span className={cx("price")}>{product.price}</span>
              </div>
            ))}
            </div>
        </div>
    )
}

export default Product;