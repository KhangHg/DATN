import request from "../utils/httpRequest";

export const getAllProduct = async () => {
  try {
    const res = await request.get(`/product`, {
      params: {},
    });
    return res.data;
  } catch (error) {
    console.log("getProductListAll " + error);
  }
};
