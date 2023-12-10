import request from "../../utils/httpRequest";

export const login = async ({ email, password }) => {
  try {
    const res = await request.post("/customer/login", { email, password });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
