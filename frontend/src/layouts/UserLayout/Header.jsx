import classNames from 'classnames/bind';
import styles from "./Header.module.scss"
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AuthContext } from '../../contexts/AuthContex';
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
function Header() {
    const [listCategory, setListCategory] = useState([]);
    const { token, user } = useContext(AuthContext);
  
    useEffect(() => {
      async function fetchData() {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        console.log(data);
        setListCategory(listcategoryFake);
      }
      fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx("box")}>
                <div className={cx("logo")}>
                    <a href="/">
                        <img src="src/layouts/UserLayout/NANAa.png" alt="" />
                    </a>
                </div>
                <div className={cx("category")}>
                    <div className={cx("category-item")}>
                        <Link to="/">TRANG CHỦ</Link>
                    </div>
                    <div className={cx("category-item")}>
                        <Link to="/category/list">SẢN PHẨM <ArrowDropDownIcon /></Link>
                        <div className={cx("list-item")}>

                            <ul>
                                {
                                listCategory.map((category) => (
                                    <li><Link to={`/category/${category.id}/list`}>{category.name}</Link></li>
                                ))
                            }
                            </ul>
                        </div>
                    </div>
                    <div className={cx("category-item")}>
                        <Link to="/">HỆ THỐNG CỬA HÀNG</Link>

                    </div>
                    <div className={cx("category-item")}>
                        <Link to="/">LIÊN HỆ</Link>
                    </div>
                </div>
                <div className={cx("user")}>
                    <div>
                        <Button><SearchIcon /></Button>
                    </div>
                    <div>
                        <Button><PersonIcon /></Button>
                        {token ?
                            <ul style={{ width: "150px" }}>
                                <li><Link to={"/"}>Thông tin cá nhân</Link></li>
                                <li><Link to={"/logout"}>Đăng xuất</Link></li>
                            </ul>
                            :
                            <ul style={{ width: "100px" }}>

                                <li><Link to={"/login"}>Đăng nhập</Link></li>
                                <li><Link to={"/signup"}>Đăng ký</Link></li>
                            </ul>
                        }
                    </div>
                    <div>
                        <Button><ShoppingCartIcon /></Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Header;