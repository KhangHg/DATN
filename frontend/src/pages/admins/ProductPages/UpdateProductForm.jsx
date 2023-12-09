import { useState, useEffect } from "react";
import classNames from 'classnames/bind';
import styles from './UpdateProductForm.module.scss';
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import * as Yup from 'yup'
//fake data
import { categoriesFake } from "./AddProductForm";
const fakeData = [
  {
    productId: 100,
    name: "Áo khoác đen",
    categoryName: "Áo",
    price: "120000",
    imageUrl: "https://cdnphoto.dantri.com.vn/COm1qksauO2sqAC-gVVI2DdH_1I=/thumb_w/1020/2023/01/24/khoa-hocdocx-1674520013659.png",
    description: "This is description",
    S: 0,
    M: 20,
    L: 0,
    XL: 0,
    XXL: 0
    // ...
  },
]

const cx = classNames.bind(styles);

const UpdateProductForm = () => {
  const { productId } = useParams()
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [productInfo, setProductInfo] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    categoryName: '',
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    XXL: 0
  })
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    async function getAllCategory() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        //console.log(data);
        setCategories(categoriesFake);
      } catch (error) {
        console.error('Error fetching product by id:', error);
      }
    }
    getAllCategory()

    async function getById(pId) {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        setProductInfo(fakeData[0])
        //console.log(fakeData[0])
        //console.log(productInfo)
      } catch (error) {
        console.error('Error fetching product by id:', error);
      }
    }
    getById(productId)
  }, [productId])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: productInfo,

    validationSchema: Yup.object({
      name: Yup.string().required('Bạn chưa điền tên sản phẩm!'),
      description: Yup.string().required('Bạn chưa thêm mô tả cho sản phẩm'),
      price: Yup.string().required('Bạn chưa nhập giá cho sản phẩm'),
      imageUrl: Yup.string().required("Bạn chưa thêm ảnh minh họa cho sản phẩm"),
      categoryName: Yup.string().required('Bạn chưa thêm danh mục cho sản phẩm'),
      S: Yup.number().integer('Số lượng phải là số nguyên').min(-1, 'Số lượng không âm').required('Nhập số lượng sản phẩm'),
      M: Yup.number().integer('Số lượng phải là số nguyên').min(0, 'Số lượng không âm').required('Nhập số lượng sản phẩm'),
      L: Yup.number().integer('Số lượng phải là số nguyên')
        .min(0, 'Số lượng không âm').required('Nhập số lượng sản phẩm'),
      XL: Yup.number().integer('Số lượng phải là số nguyên')
        .min(0, 'Số lượng không âm').required('Nhập số lượng sản phẩm'),
      XXL: Yup.number().integer('Số lượng phải là số nguyên')
        .min(0, 'Số lượng không âm').required('Nhập số lượng sản phẩm')
    }),

    onSubmit: values => {
      console.log('data', values)
    }
  })

  const handleCloseCancelModal = () => setShowCancelModal(false);
  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    navigate('/admin/products');
  };

  return (
    <div className={cx("container")}>
      <div className={cx('nav')}>
        <Link to="/admin/products" className={cx('back')}>
          <FontAwesomeIcon icon={faArrowLeft}
            style={{ paddingRight: '10px' }}
          />
          Quay lại danh sách sản phẩm
        </Link>
      </div>

      <form action="" method="POST" className={cx("form")} onSubmit={formik.handleSubmit} id={cx("form-1")}>
        <h3 className={cx("info")}>Thông tin sản phẩm</h3>

        <div className={cx('spacer')}></div>
        <div className={cx("form-body")}>
          <div className={cx('form-group')}>
            <div className={cx("form-input")}>
              <label htmlFor="name" className={cx("form-label")}>Tên sản phẩm<span> *</span></label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Tên sản phẩm"
                value={formik.values.name}
                onChange={formik.handleChange}
                className={cx("form-control")} />
              {formik.errors.name && formik.touched.name && (<span className={cx("form-message")}>{formik.errors.name}</span>)}
            </div>

            <div className={cx("form-input")}>
              <label htmlFor="description" className={cx("form-label")}>Mô tả sản phẩm<span> *</span></label>
              <textarea
                id="description"
                name="description"
                placeholder="Mô tả sản phẩm"
                value={formik.values.description}
                rows="4"
                onChange={formik.handleChange}
                className={cx("form-control")} />
              {formik.errors.description && formik.touched.description && (<span className={cx("form-message")}>{formik.errors.description}</span>)}
            </div>

            <div className={cx("form-input")}>
              <label htmlFor="price" className={cx("form-label")}>Giá bán<span> *</span></label>
              <input
                id="price"
                name="price"
                type="text"
                placeholder="nhập giá"
                value={formik.values.price}
                onChange={formik.handleChange}
                className={cx("form-control")} />
              {formik.errors.price && formik.touched.price && (<span className={cx("form-message")}>{formik.errors.price}</span>)}
            </div>

            <div className={cx("form-input")}>
              <label htmlFor="imageUrl" className={cx("form-label")}>Url ảnh mẫu sản phẩm<span> *</span></label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="text"
                placeholder="Nhập link ảnh sản phẩm"
                value={formik.values.imageUrl}
                onChange={formik.handleChange}
                className={cx("form-control")} />
              {formik.values.imageUrl &&
                <div className={cx('imageArea')}>
                  <p>Ảnh mẫu sản phẩm</p>
                  <img style={{ width: '240px', height: '300px' }} src={formik.values.imageUrl}></img>
                </div>}
              {formik.errors.imageUrl && formik.touched.imageUrl && (<span className={cx("form-message")}>{formik.errors.imageUrl}</span>)}
            </div>
          </div>

          <div className={cx('form-group')}>
            <div className={cx('form-input2')}>
              <label htmlFor="categoryName" className={cx("form-label")}>Danh mục:<span> * &nbsp;</span></label>
              <select
                id={cx("categoryName")}
                name="categoryName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.categoryName}
              >
                <option>Chọn danh mục</option>
                {categories && categories.map(category => (
                  <option key={category.categoryId} value={category.categoryName}>{category.categoryName}</option>
                ))}
              </select>
              {formik.errors.categoryName && formik.touched.categoryName && (<span className={cx("form-message")}><br></br>{formik.errors.categoryName}</span>)}
            </div>
            <div className={cx("form-input2")} id={cx('size')}>
              {['S', 'M', 'L', 'XL', 'XXL'].map((item, key) => (
                <div key={key} className={cx('size-input')}>
                  <label htmlFor={`${item}`} className={cx('size-label')}>Size {item}</label>
                  <input
                    id={`${item}`}
                    name={`${item}`}
                    type="number"
                    placeholder="Số sản phẩm"
                    value={formik.values[`${item}`]} //how?
                    onChange={formik.handleChange}
                    className={cx("form-control")}
                  />
                  {formik.errors[`${item}`] && formik.touched[`${item}`] && (<span className={cx("form-message")}>{formik.errors[`${item}`]}</span>)}
                </div>
              ))}
            </div>
            <div className={cx('btn')}>
              <button className={cx("cancel")} onClick={handleCancel}>Hủy</button>
              <button
                className={cx("form-submit")}
                type='submit'
                value='Submit Form'
              >Cập nhật
              </button>
            </div>
          </div>
        </div>
      </form>
      <Modal show={showCancelModal} onHide={handleCloseCancelModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận hủy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn hủy cập nhật?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className={cx("btn-close-modal")} style={{ backgroundColor: '#36a2eb' }} onClick={handleCloseCancelModal}>
            Đóng
          </Button>
          <Button variant="danger" onClick={handleConfirmCancel}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UpdateProductForm
