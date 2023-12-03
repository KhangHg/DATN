import request from "../../utils/httpRequest";

export const getCartItemList = async (email) => {
  try {
    const res = await request.get(`/cart/${email}`, {
      params: {},
    });
    return res.data;
  } catch (error) {
    console.log("getCartItemList " + error);
  }
};

export const createCartItem = async (email, productId, size, quantity) => {
  try {
    const res = await request.post(`/cart/${email}`, { productId, size, quantity });
    return res.data;
  } catch (error) {
    console.log("getCartItemList " + error);
  }
};

export const deleteCartItem = async (email, productId, size) => {
  try {
    const res = await request.delete(`/cart/${email}?productId=${productId}&size=${size}`, {
      params: {},
    });
    return res.data;
  } catch (error) {
    console.log("deleteCartItem " + error);
  }
};
export const updateCartItem = async (quantity, email, productId, size) => {
  try {
    const res = await request.put(`/cart/${email}?productId=${productId}&size=${size}`, {
      quantity,
    });
    return res.data;
  } catch (error) {
    console.log("deleteCartItem " + error);
  }
};
