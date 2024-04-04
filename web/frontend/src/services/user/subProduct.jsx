import request from "../../utils/httpRequest";

export const subProduct = async (name, size, quantity) => {
  try {
    const res = await request.put("/product", {
      name,
      size,
      quantity,
    });
    return res.data;
  } catch (error) {
    console.log("getCartItemList " + error);
  }
};
