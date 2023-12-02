import request from "../utils/httpRequest";

export const getProductList = async () => {
  try {
    const res = await request.get("/product/", {
      params: {},
    });
    return res.data;
  } catch (error) {
    console.log("getProductList " + error);
  }
};
