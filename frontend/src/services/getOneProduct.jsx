import request from "../utils/httpRequest";

export const getOneProduct1 = async (id) => {
  try {
    const res = await request.get(`/product/${id}`, {
      params: {},
    });
    return res.data;
  } catch (error) {
    console.log("getOneProduct " + error);
  }
};

export const getOneProduct = async (id) => {
  try {
    const res = await request.get(`/product/old/${id}`, {
      params: {},
    });
    return res.data;
  } catch (error) {
    console.log("getOneProduct " + error);
  }
};
