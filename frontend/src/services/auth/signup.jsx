import request from "../../utils/httpRequest";

export const signup = async ({ fullname, email, phoneNumber, password }) => {
  try {
    const res = await request.post("/customer/", { name: fullname, email, phone: phoneNumber, password });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
