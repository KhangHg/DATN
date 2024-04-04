import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { HomeIcon, OrderIcon, ProductIcon, ClientIcon, StatsIcon, SalesCounterIcon } from "../../../components/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContex";
import routes from "../../../config/routes";

const cx = classNames.bind(styles);

function Sidebar({ setToggleButton }) {
  const { handleLoggedOut, user } = useContext(AuthContext);
  const [details, setDetails] = useState({
    showDetailOrder: false,
    showDetailProduct: false,
  });

  const [active, setActive] = useState({
    listOrder: false,
    listProduct: true,
    listCustommer: false,
    listCategory: false,
    shop: false
  });
  const [toggle, setToggle] = useState({
    action: false,
    value: 0,
  });

  const handleShowDetail = (detailName) => {
    setDetails((prevState) => ({
      showDetailOrder: false,
      showDetailProduct: false,
      [detailName]: !prevState[detailName],
    }));
  };

  const handleActive = (detailName) => {
    setActive((prevState) => ({
      listOrder: false,
      listProduct: false,
      listCustommer: false,
      listCategory: false,
      shop: false,
      [detailName]: true,
    }));
  };

  return (
    <div className={cx("wrapper")} style={{ width: `calc(230px - ${toggle.value}px)` }}>
      <nav>
        <div className={cx("menuTopHeader")}>
          <div className={cx("menuTopLogo")}>
            {!toggle.action && (
              <a href="/admin">
                <img src="/src/layouts/AdminLayout/Sidebar/NANAa.png" className={cx("logo")} alt="logoSapo"></img>
              </a>
            )}
          </div>
        </div>

        <div className={cx("menuInnerWrapper")}>
          <div className={cx("menuPrimaryInner")}>
            <nav className={cx("menuList")}>
              {/* Sản phẩm */}
              <div
                className={cx("homeMenuItem", "itemNav", {
                  active: active.listProduct || active.listCategory,
                })}
                onClick={() => handleShowDetail("showDetailProduct")}
              >
                <div className={cx("wrapIconItem")}>
                  <ProductIcon />
                </div>
                {!toggle.action && (
                  <>
                    <div className={cx("menuItemTitle")}>
                      <span>Sản phẩm</span>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        className={cx("iconArrowRight", {
                          activeIcon: details.showDetailProduct,
                        })}
                        icon={faAngleRight}
                      />
                    </div>
                  </>
                )}
              </div>
              {/* Chi tiết trong sản phẩm */}
              {!toggle.action && (
                <div className={cx("wrapCollapseItem", { showCollapseItem: details.showDetailProduct })}>
                  <Link to="/admin/products" className={cx("homeMenuItem", "itemNav", "innerWrapCollapseItem")} onClick={() => handleActive("listProduct")}>
                    <div className={cx("menuItemTitle")}>
                      <span>Danh sách sản phẩm</span>
                    </div>
                  </Link>
                  <Link to="/admin/categories" className={cx("homeMenuItem", "itemNav", "innerWrapCollapseItem")} onClick={() => handleActive("listCategory")}>
                    <div className={cx("menuItemTitle")}>
                      <span>Danh sách danh mục</span>
                    </div>
                  </Link>
                </div>
              )}

              {/* Đơn hàng */}
              <div
                className={cx("homeMenuItem", "itemNav", {
                  active: active.listOrder || active.listCustommer,
                })}
                onClick={() => handleShowDetail("showDetailOrder")}
              >
                <div className={cx("wrapIconItem")}>
                  <ProductIcon />
                </div>
                {!toggle.action && (
                  <>
                    <div className={cx("menuItemTitle")}>
                      <span>Đơn hàng</span>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        className={cx("iconArrowRight", {
                          activeIcon: details.showDetailOrder,
                        })}
                        icon={faAngleRight}
                      />
                    </div>
                  </>
                )}
              </div>
              {/* Chi tiết trong sản phẩm */}
              {!toggle.action && (
                <div className={cx("wrapCollapseItem", { showCollapseItem: details.showDetailOrder })}>
                  <Link to="/admin/orders" className={cx("homeMenuItem", "itemNav", "innerWrapCollapseItem")} onClick={() => handleActive("listOrder")}>
                    <div className={cx("menuItemTitle")}>
                      <span>Danh sách đơn hàng</span>
                    </div>
                  </Link>
                  <Link to="/admin/customers" className={cx("homeMenuItem", "itemNav", "innerWrapCollapseItem")} onClick={() => handleActive("listCustommer")}>
                    <div className={cx("menuItemTitle")}>
                      <span>Danh sách khách hàng</span>
                    </div>
                  </Link>
                </div>
              )}

              {/* Cửa hàng */}
              <div
                className={cx("homeMenuItem", "itemNav", {
                  active : active.shop
                })}
              >
                <div className={cx("wrapIconItem")}>
                  <HomeIcon />
                </div>

                <Link to="/admin/stores" className={cx("menuItemTitle")} onClick={() => handleActive("shop")}>
                  <div className={cx("menuItemTitle")}>
                    <span style={{color:'white'}}>Cửa hàng</span>
                  </div>
                </Link>

              </div>

              <hr className={cx("menuDivider")}></hr>

              <Link to="/login" className={cx("homeMenuItem", "itemNav")} onClick={handleLoggedOut}>
                <div className={cx("wrapIconItem")}>
                  <LogoutIcon />
                </div>
                {!toggle.action && (
                  <div className={cx("menuItemTitle")}>
                    <span>Đăng xuất</span>
                  </div>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
