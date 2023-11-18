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
    
    
    //admin
    
    adminHome: '/admin',
    productListAdmin: '/admin/products',
    categoryListAdmin: '/admin/categories',
    orderListAdmin: '/admin/orders',
    customerListAdmin: '/admin/customers',
    notfound404admin: '/admin/*',
};

export default routes;
