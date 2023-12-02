import request from "../../utils/httpRequest";

export const login = async ({ email, password, role }) => {
  try {
    const res = await request.post("/customer/login", { email, password, role });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
