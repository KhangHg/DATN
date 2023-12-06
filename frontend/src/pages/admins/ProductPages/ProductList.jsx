import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';
import DataTable from 'react-data-table-component'
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import customStyles from './CustomTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';

const cx = classNames.bind(styles);

export const listProduct = [
    {
        productId: 100,
        name: "Áo khoác đen",
        categoryName: "Áo",
        quantity: 20,
        price: "120000",
        imageUrl: "https://cdnphoto.dantri.com.vn/COm1qksauO2sqAC-gVVI2DdH_1I=/thumb_w/1020/2023/01/24/khoa-hocdocx-1674520013659.png",
        description: "This is description",
        sizeName: 'M',
        // ...
    },
    {
        productId: 101,
        name: "Quần âu",
        price: "200000",
        categoryName: "Quần",
        quantity: 20,
        imageUrl: "linkimgae",
        description: "This is description",
        sizeName: 'M',
        // ...
    },
    {
        productId: 101,
        name: "Quần âu",
        price: "200000",
        categoryName: "Quần",
        quantity: 20,
        imageUrl: "linkimgae",
        description: "This is description",
        sizeName: 'L',
        // ...
    },
    {
        productId: 101,
        name: "Quần âu",
        price: "200000",
        categoryName: "Quần",
        quantity: 20,
        imageUrl: "linkimgae",
        description: "This is description",
        sizeName: 'XL',
        // ...
    },
    {
        productId: 102,
        name: "Áo gió",
        categoryName: "Áo",
        quantity: 20,
        price: "30000",
        image: "linkimgae",
        description: "This is description",
        sizeName: 'M',
        // ...
    },
    {
        productId: 103,
        name: "Áo len",
        price: "10000.0",
        categoryName: "Áo",
        quantity: 20,
        imageUrl: "linkimgae",
        description: "This is description",
        sizeName: 'XXL',
        // ...
    },
    {
        productId: 104,
        name: "Quần dài",
        categoryName: "Quần",
        quantity: 20,
        price: "100000",
        imageUrl: "linkimgae",
        description: "This is description",
        sizeName: 'S',
        // ...
    },
];

const categoriesFake = [
    {
        categoryId: 1,
        categoryName: "Áo"
    },
    {
        categoryId: 2,
        categoryName: "Quần"
    },
    {
        categoryId: 3,
        categoryName: "Khăn"
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
            selector: (row) => row.categoryName,
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
            cell: (row) => <img src={row.imageUrl} alt={row.name} className={cx('image-cell')} />,
        },
        {
            name: "",
            cell: (row) => <Link to={`/admin/products/${row.productId}`}><FontAwesomeIcon icon={faEdit} /></Link>,
        }
    ];
    const [originalProducts, setOriginalProducts] = useState([]);
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleClear, setToggleClear] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const handleCloseDeleteModal = () => setShowCancelModal(false);
    const confirmDelete = () => {
        setShowDeleteModal(true);
    };
    //const navigate = useNavigate()

    useEffect(() => {
        //get all products
        async function getAllProduct() {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await response.json();
            console.log(data);
            //lọc theo id sản phẩm sau này thay listProduct bằng data trả về từ be
            const uniqueProducts = Object.values(
                listProduct.reduce((accumulator, product) => {
                    const { productId, quantity, sizeName, ...rest } = product;

                    if (!accumulator[productId]) {
                        accumulator[productId] = { productId, quantity, ...rest };
                    } else {
                        accumulator[productId].quantity += quantity;
                    }

                    return accumulator;
                }, {})
            );
            setProducts(uniqueProducts);
            setOriginalProducts(uniqueProducts)
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
                return row.categoryName === category
            })

            setProducts(filterProduct)
        } else {
            setProducts(originalProducts)
        }
        setSelectedCategory(category)
    }

    const handleDelete = async () => {
        // Lấy danh sách ID của các sản phẩm đã chọn
        const productIdsToDelete = selectedRows.map(row => row.productId)

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
            const updatedProducts = products.filter(product => !productIdsToDelete.includes(product.productId))
            setProducts(updatedProducts)
            setOriginalProducts(originalProducts.filter(product => !productIdsToDelete.includes(product.productId)))
            setToggleClear(!toggleClear)
            setSelectedRows([])
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error.message);
        }
        setShowDeleteModal(false)
    };

    return (
        <div className={cx('wrap')}>
            <div className={cx('cd-product')}>
                <button
                    className={cx('delete-btn')}
                    onClick={confirmDelete}
                >
                    Xóa sản phẩm
                </button>
                <Link to="/admin/products/add" className={cx('create-btn')}>Thêm sản phẩm</Link>
            </div>

            <div className={cx('search-bar')}>

                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Tất cả loại</option>
                    {categoriesFake.map(category => (
                        <option key={category.categoryId} value={category.categoryName}>{category.categoryName}</option>
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
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận hủy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn chắc chắn muốn xóa sản phẩm?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className={cx("btn-close-modal")} style ={{backgroundColor:'#36a2eb'}} onClick={handleCloseDeleteModal}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default ProductList;