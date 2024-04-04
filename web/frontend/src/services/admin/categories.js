import request from "../../utils/httpRequest";

export const getCategories = async () => {
  try {
    const res = await request.get("/category/", {
      params: {},
    });
    return res.data.data;
  } catch (error) {
    console.log("getCategory " + error);
  }
};
export const deleteCategories = async (id) => {
  try {
    const res = await request.delete(`/category/${id}`, {
      params: {},
    });
    return res.data.data;
  } catch (error) {
    console.log("getCategory " + error);
  }
};
export const createCategories = async (name) => {
  try {
    const res = await request.post("/category/", {
      name,
    });
    return res.data.data;
  } catch (error) {
    console.log("getCategory " + error);
  }
};
