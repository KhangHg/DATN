import request from "../utils/httpRequest";

export const getProductList = async (category_id) => {
  try {
    const res = await request.get(`/product/category/${category_id}`, {
      params: {},
    });
    return res.data;
  } catch (error) {
    console.log("getProductList " + error);
  }
};
