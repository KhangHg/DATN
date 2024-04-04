import request from "../../utils/httpRequest";

export const signup = async ({ fullname, email, phoneNumber, password, role }) => {
  try {
    const res = await request.post("/customer/", { name: fullname, email, phone: phoneNumber, password, role });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
