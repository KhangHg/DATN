import classNames from 'classnames/bind';
import styles from './CategoryList.module.scss';
import DataTable from 'react-data-table-component'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import customStyles from '../ProductPages/CustomTable'
import { Modal, Button } from 'react-bootstrap';
const cx = classNames.bind(styles);
const categoriesFake = [
    {
        id: 1,
        name: "Áo"
        //
    },
    {
        id: 2,
        name: "Quần"
        //
    },
    {
        id: 3,
        name: "Khăn"
        //
    },
    {
        id: 4,
        name: "Áo"
        //
    },
    {
        id: 5,
        name: "Quần"
        //
    },
    {
        id: 6,
        name: "Khăn"
        //
    },
    {
        id: 7,
        name: "Áo"
        //
    },
    {
        id: 8,
        name: "Quần"
        //
    },
    {
        id: 9,
        name: "Khăn"
        //
    },
]

const CategoryList = () => {
    const columns = [
        {
            name: 'STT',
            selector: (row) => row.id,
        },
        {
            name: 'Loại',
            selector: (row) => row.name,
        },
    ];

    const [categories, setCategories] = useState(categoriesFake)
    const [selectedRows, setSelectedRows] = useState([])
    const [clearSelect, setClearSelect] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const confirmDelete = () => {
        setShowDeleteModal(true);
    };

    useEffect(() => {
        async function getAllCategory() {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await response.json();
            //console.log(data);

            //setCategories(categoriesFake);
        }
        getAllCategory();
        setSelectedRows([])

    }, [categories])

    const handleDelete = async () => {
        // Lấy danh sách ID của các sản phẩm đã chọn
        const categoryIdsToDelete = selectedRows.map(row => row.id);

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

            // Nếu xóa thành công, cập nhật state với danh sách danh mục mới (loại bỏ các danh mục đã chọn)
            const updatedCategories = categories.filter(c => !categoryIdsToDelete.includes(c.id));
            setCategories(updatedCategories);

            // Đặt lại danh sách các danh mục được chọn
            setClearSelect(!clearSelect)
            setSelectedRows([])

        } catch (error) {
            console.error('Lỗi khi xóa danh mục:', error.message);
        }
        setShowDeleteModal(false)
    };


    return (
        <div className={cx('wrap')}>

            <div className={cx('cd-category')}>
                <button
                    className={cx('delete-btn')}
                    onClick={confirmDelete}
                >
                    Xóa danh mục sản phẩm
                </button>
                <Link to="/admin/categories/add" className={cx('create-btn')}>Thêm danh mục sản phẩm</Link>
            </div>

            <div>
                <h3>
                    Danh sách danh mục
                </h3>
            </div>

            <DataTable
                columns={columns}
                data={categories}
                selectableRows
                fixedHeader
                pagination
                onSelectedRowsChange={({ selectedRows }) => { setSelectedRows(selectedRows); console.log(selectedRows) }}
                customStyles={customStyles}
                clearSelectedRows={clearSelect}
            >
            </DataTable>
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
        </div>
    )
}

export default CategoryList;