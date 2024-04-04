import request from "../../utils/httpRequest";

export const getAddress = async () => {
  try {
    const res = await request.get("/address-shop/", {
      params: {},
    });
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log("getCategory " + error);
  }
};
export const deleteAddress = async (id) => {
  try {
    const res = await request.delete(`/address-shop/${id}`, {
      params: {},
    });
    return res.data.data;
  } catch (error) {
    console.log("getCategory " + error);
  }
};
export const createAddress = async (province, address, phone) => {
  try {
    const res = await request.post("/address-shop/", {
      province,
      address,
      phone,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("getCategory " + error);
  }
};
