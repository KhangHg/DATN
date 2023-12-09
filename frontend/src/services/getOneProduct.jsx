import request from "../utils/httpRequest";

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
