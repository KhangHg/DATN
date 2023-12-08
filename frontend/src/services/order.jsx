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

export const updateOrder = async (status, id) => {
  const data = {
    status: status
  }
  try {
    const res = await request.put(`/order/id=${id}`, data);
    return res.data;
  } catch (error) {
    console.log("updateOrder " + error);
  }
};

export const getDetailOrder = async (id) => {
  try {
    const res = await request.get(`/order/id=${id}`);
    return res.data;
  } catch (error) {
    console.log("getDetailOrder " + error);
  }
};
