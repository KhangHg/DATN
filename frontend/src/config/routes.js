const routes = {
    home: '/',
    login: '/login',
    signup: '/signup',
    forbiden403:'/403',
    notfound404user: '/*',
    listProduct: "/listProduct",
    productDescription: "/productDescription",
    categoryAll:'/category/list',
    category:'/category/:categoryId/list',
    storeLocation:'/storeLocation',
    
    
    //admin
    
    adminHome: '/admin',
    productListAdmin: '/admin/products',
    productUpdateAdmin: '/admin/products/:productId',
    productAddAdmin: '/admin/products/add',
    categoryListAdmin: '/admin/categories',
    categoryAddAdmin: '/admin/categories/add',
    orderListAdmin: '/admin/orders',
    customerListAdmin: '/admin/customers',
    notfound404admin: '/admin/*',
};

export default routes;
