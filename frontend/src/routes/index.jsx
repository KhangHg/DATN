import routesConfig from "../config/routes";

//import pages
import NotFound404 from "../pages/NotFound404/NotFound404";
import Forbiden403 from "../pages/Forbiden403/Forbiden403";
import Home from "../pages/users/Home/Home";
import Login from "../pages/auths/Login/Login";
import Signup from "../pages/auths/Signup";
import ProductList from "../pages/admins/ProductPages/ProductList";
import CategoryList from "../pages/admins/CategoryPages/CategoryList";
import OrderList from "../pages/admins/OrderPages/OrderList";
import CustomerList from "../pages/admins/CustomerPages/CustomerList";
import DefaultLayout from "../layouts/AdminLayout/DefaultLayout/DefaultLayout";
import ListProduct from "../pages/users/ListProduct/ListProduct";
import ProductDescription from "../pages/users/ProductDescription/ProductDescription";
import Product from '../pages/users/Products/Product';
//import layout

//public route

const userRoutes = [
    { path: routesConfig.login, component: Login, layout: null, title: 'Đăng nhập' },
    { path: routesConfig.signup, component: Signup, layout: null, title: 'Tạo tài khoản' },
    { path: routesConfig.home, component: Home, layout: null, title: 'Tổng quan' },
    { path: routesConfig.categoryAll, component: Product,layout: null, title: '' },
    { path: routesConfig.category, component: Product,layout: null, title: '' },
    { path: routesConfig.notfound404user, component: NotFound404,layout: null, title: '' },
    { path: routesConfig.notfound404user, component: NotFound404,layout: null, title: '' },
    { path: routesConfig.listProduct, component: ListProduct, layout: null, title: "Danh sách sản phẩm" },
    { path: routesConfig.productDescription, component: ProductDescription, layout: null, title: "Chi tiết 1 sản phẩm" },
];

const adminRoutes = [
  { path: routesConfig.adminHome, component: ProductList, title: "Quản lý danh sách sản phẩm" },
  { path: routesConfig.productListAdmin, component: ProductList, title: "Quản lý danh sách sản phẩm" },
  { path: routesConfig.categoryListAdmin, component: CategoryList, title: "Quản lý danh mục sản phẩm" },
  { path: routesConfig.orderListAdmin, component: OrderList, title: "Quản lý danh sách đơn hàng" },
  { path: routesConfig.customerListAdmin, component: CustomerList, title: "Quản lý danh sách khách hàng" },
  { path: routesConfig.notfound404admin, component: NotFound404, layout: DefaultLayout, title: "" },
];

export { userRoutes, adminRoutes };
