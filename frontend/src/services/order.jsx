import request from "../utils/httpRequest";

export const createOrder = async (email, name, phone, status, address, total, items) => {
  try {
    console.log(items);
    const res = await request.post("/order", {
      email,
      name,
      phone,
      status,
      address,
      total,
      items,
    });
    return res.data;
  } catch (error) {
    console.log("getOneProduct " + error);
  }
};
