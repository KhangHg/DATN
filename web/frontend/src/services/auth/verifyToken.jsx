import request from "../../utils/httpRequest";

export const verifyToken = async (token) => {
  const res = await request.post("/customer/verify", { token });
  return res.data;
};
export const verifyTokenAdmin = async (token) => {
  const res = await request.post("/customer/admin/verify", { token });
  return res.data;
};
