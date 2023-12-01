import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';
import DataTable from 'react-data-table-component'
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import customStyles from './CustomTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const listProduct = [
    {
        id: 100,
        name: "Áo khoác đen",
        category: "Áo",
        quantity: 20,
        price: 120000,
        image: "https://cdnphoto.dantri.com.vn/COm1qksauO2sqAC-gVVI2DdH_1I=/thumb_w/1020/2023/01/24/khoa-hocdocx-1674520013659.png",
        // ...
    },
    {
        id: 101,
        name: "Áo khoác trắng",
        price: 200000,
        category: "Quần",
        quantity: 20,
        image: "linkimgae",
        // ...
    },
    {
        id: 110,
        name: "Áo khoác đen",
        category: "Áo",
        quantity: 20,
        price: 100000,
        image: "linkimgae",
        // ...
    },
    {
        id: 111,
        name: "Áo khóac trắng",
        price: 100000,
        category: "Áo",
        quantity: 20,
        image: "linkimgae",
        // ...
    },
    {
        id: 112,
        name: "Áo khoác đen",
        category: "Áo",
        quantity: 20,
        price: 100000,
        image: "linkimgae",
        // ...
    },
];

const categoriesFake = [
    {
        id: 1,
        name: "Áo"
    },
    {
        id: 2,
        name: "Quần"
    },
    {
        id: 3,
        name: "Khăn"
    },
]

const ProductList = () => {

    const columns = [
        {
            name: 'Sản Phẩm',
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: 'Loại',
            selector: (row) => row.category,
        },
        {
            name: 'Số lượng',
            selector: (row) => row.quantity,
            sortable: true
        },
        {
            name: 'Giá',
            selector: (row) => row.price,
            sortable: true
        },
        {
            name: 'Ảnh',
            cell: (row) => <img src={row.image} alt={row.name} className={cx('image-cell')} />,
        },
        {
            name: "",
            cell: (row) => <button onClick={() => handleUpdate(row)}><FontAwesomeIcon icon={faEdit} /></button>,
        }
    ];
    const [originalProducts, setOriginalProducts] = useState([]);
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleClear, setToggleClear] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        //get all products
        async function getAllProduct() {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await response.json();
            console.log(data);
            setProducts(listProduct);
            setOriginalProducts(listProduct)
        }
        getAllProduct();

        //get all category
        async function getAllCategory() {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await response.json();
            console.log(data);
            setCategories(categoriesFake);
        }
        getAllCategory();
    }, [])

    function handleSearch(e) {
        const filterData = originalProducts.filter(row => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setProducts(filterData)
    }

    const handleCategoryChange = (e) => {
        const category = e.target.value

        if (category) {
            const filterProduct = originalProducts.filter(row => {
                return row.category === category
            })

            setProducts(filterProduct)
        } else {
            setProducts(originalProducts)
        }
        setSelectedCategory(category)
    }

    const handleDelete = async () => {
        // Lấy danh sách ID của các sản phẩm đã chọn
        const productIdsToDelete = selectedRows.map(row => row.id)

        try {
            /* Gọi API để xóa các danh mục
            //const response = await fetch('URL_API_DELETE_CATEGORIES', {
            //    method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ categoryIds: categoryIdsToDelete }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }*/
            const updatedProducts = products.filter(product => !productIdsToDelete.includes(product.id))
            setProducts(updatedProducts)
            setOriginalProducts(updatedProducts)
            setToggleClear(!toggleClear)
            setSelectedRows([])
        }catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error.message);
        }
    };

    const handleUpdate = (row) => {
        const productId = row.id
        navigate(`/admin/products/${productId}`)
    }

    return (
        <div className={cx('wrap')}>
            <div className={cx('cd-product')}>
                <button
                    className={cx('delete-btn')}
                    onClick={handleDelete}
                >
                    Xóa sản phẩm
                </button>
                <Link to="/admin/products/add" className={cx('create-btn')}>Thêm sản phẩm</Link>
            </div>

            <div className={cx('search-bar')}>

                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Tất cả loại</option>
                    {categoriesFake.map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên sản phẩm"
                    //value={}
                    onChange={handleSearch}
                />

            </div>

            <div className={cx('products-list')}>
                <h3>
                    {selectedCategory || 'Tất cả sản phẩm'}
                </h3>
                <DataTable
                    columns={columns}
                    data={products}
                    selectableRows
                    fixedHeader
                    pagination
                    customStyles={customStyles}
                    onSelectedRowsChange={({ selectedRows }) => { setSelectedRows(selectedRows); console.log(selectedRows) }}
                    clearSelectedRows={toggleClear}
                >
                </DataTable>

            </div>
        </div >
    )
}

export default ProductList;