import request from "../utils/httpRequest";

export const getAllAddress = async () => {
  try {
    const res = await request.get("/address-shop/", {
      params: {},
    });
    return res.data;
  } catch (error) {
    console.log("shopAddress " + error);
  }
};
