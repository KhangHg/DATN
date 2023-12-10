import request from "../../utils/httpRequest";

export const getOrder = async () => {
  try {
    const res = await request.get("/order/");
    return res.data;
  } catch (error) {
    console.log("getCategory " + error);
  }
};
