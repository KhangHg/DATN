import { GETLISTITEM, CREATEITEM, DELETEITEM, UPDATEITEM, FETCH_LISTCART_SUCCESS, UPQUANTITY, DOWNQUANTITY, CREATEORDER } from "./type";
import { getCartItemList, createCartItem, deleteCartItem, updateCartItem } from "../../services/user/cart";
import { createOrder } from "../../services/order";
import { RemoveProduct, AddProduct } from "../../Tracker";
export const getListItem = (email) => {
  return async (dispatch, getState) => {
    try {
      const res = await getCartItemList(email);
      const data = res && res.data ? res.data : [];
      dispatch(fetchListCartItemSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createCartItemAction = (email, productId, size, quantity, price, name, category) => {
  return async (dispatch, getState) => {
    try {
      let res = await createCartItem(email, productId, size, quantity);
      if (res && res.data.errCode === 0) {
        console.log("id : " + productId + " cate : " + category + " price : " + price + " qty : " + quantity + " size : " + size + name);
        AddProduct(name, Number(price), String(productId), category, size, (quantity))
        dispatch(createItemCartPayLoad());
        dispatch(getListItem(email));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteCartItemAction = (email, productId, size, quantity, price, name, category) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteCartItem(email, productId, size);
      if (res && res.data.errCode === 0) {
        console.log("id : " + productId + " cate : " + category + " price : " + price + " qty : " + quantity + " size : " + size + name);
        RemoveProduct(name, Number(price), String(productId), category, size, Number(quantity));
        dispatch(deleteItemCartPayLoad());
        dispatch(getListItem(email));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const upCartItemAction = (quantity, email, productId, size) => {
  return async (dispatch, getState) => {
    try {
      const newquantity = quantity + 1;
      let res = await updateCartItem(newquantity, email, productId, size);
      if (res && res.data.errCode === 0) {
        dispatch(upQuantityItemCartPayLoad());
        dispatch(getListItem(email));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const downCartItemAction = (quantity, email, productId, size) => {
  return async (dispatch, getState) => {
    try {
      const newquantity = quantity > 1 ? quantity - 1 : 1;
      let res = await updateCartItem(newquantity, email, productId, size);
      if (res && res.data.errCode === 0) {
        dispatch(downQuantityItemCartPayLoad());
        dispatch(getListItem(email));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createOrderAction = (email, name, phone, status, address, total, items) => {
  return async (dispatch, getState) => {
    try {
      let res = await createOrder(email, name, phone, status, address, total, items);
      if (res && res.data.errCode === 0) {
        dispatch(createOrderPayload());
        dispatch(getListItem(email));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createItemCartPayLoad = () => {
  return {
    type: CREATEITEM,
  };
};
export const deleteItemCartPayLoad = () => {
  return {
    type: DELETEITEM,
  };
};
export const upQuantityItemCartPayLoad = () => {
  return {
    type: UPQUANTITY,
  };
};
export const downQuantityItemCartPayLoad = () => {
  return {
    type: DOWNQUANTITY,
  };
};

export const createOrderPayload = () => {
  return {
    type: CREATEORDER,
  };
};
export const fetchListCartItemSuccess = (payload) => {
  return {
    type: FETCH_LISTCART_SUCCESS,
    payload,
  };
};
