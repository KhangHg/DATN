import request from "../../utils/httpRequest";

export const updateProduct = async (productId, name, description, price, imageUrl, XXL, XL, L, M, S) => {
  try {
    const res = await request.put(`/product/${productId}`, { name, description, price, imageUrl, XXL, XL, L, M, S });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("updateOrder " + error);
  }
};

export const createProduct = async (name, description, price, category, imageUrl, XXL, XL, L, M, S) => {
  try {
    const res = await request.post(`/product/`, { name: name, description: description, price: price, categoryName: category, imageUrl: imageUrl, XXL: XXL, XL: XL, L: L, M: M, S: S });
    return res.data;
  } catch (error) {
    console.log("getCartItemList " + error);
  }
};
export const deleteProduct = async (id) => {
  try {
    const res = await request.delete(`/product/${id}`);
    return res.data;
  } catch (error) {
    console.log("getCartItemList " + error);
  }
};
