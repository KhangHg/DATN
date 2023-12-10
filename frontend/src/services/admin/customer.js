import request from "../../utils/httpRequest";

export const getAllCustomer = async () => {
  try {
    const res = await request.get("/customer/", {
      params: {},
    });
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log("customer " + error);
  }
};
export const deleteCustomer = async (id) => {
  try {
    const res = await request.delete(`/customer/${id}`, {
      params: {},
    });
    return res.data.data;
  } catch (error) {
    console.log("customer " + error);
  }
};
