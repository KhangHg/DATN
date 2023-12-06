import request from "../../utils/httpRequest";

export const verifyToken = async (token) => {
  const res = await request.post("/customer/verify", { token });
  return res.data;
};
