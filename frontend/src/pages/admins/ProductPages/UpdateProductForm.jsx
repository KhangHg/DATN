import React from "react"
import classNames from 'classnames/bind';
import styles from './UpdateProductForm.module.scss';
import { useNavigate, useParams } from 'react-router-dom'

const cx = classNames.bind(styles);

const UpdateProductForm = () => {
  const { productId } = useParams()
  
  return (
    <div>
      <h2> cập nhật sản phẩm</h2>
    </div>
  )
}

export default UpdateProductForm