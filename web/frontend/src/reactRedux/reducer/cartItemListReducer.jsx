import { FETCH_LISTCART_SUCCESS, CREATEITEM, DELETEITEM, UPQUANTITY, DOWNQUANTITY, CREATEORDER } from "../action/type";

const INITIAL_STATE = {
  listCartItems: [],
  count: 0,
};

const calculateCount = (listCartItems) => {
  return listCartItems.reduce((total, item) => total + item.quantity * item.price, 0);
};

const cartItemListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LISTCART_SUCCESS:
      const updatedList = action.payload.map((item) => ({
        ...item,
        quantity: parseInt(item.quantity, 10), // Chuyển đổi quantity thành số nguyên
        price: parseInt(item.price, 10), // Chuyển đổi price thành số nguyên
      }));

      return {
        ...state,
        listCartItems: updatedList,
        count: calculateCount(updatedList), // Tính toán count dựa trên danh sách mới
      };
    case CREATEITEM:
      return {
        ...state,
      };
    case DELETEITEM:
      return {
        ...state,
      };
    case UPQUANTITY:
      return {
        ...state,
      };
    case DOWNQUANTITY:
      return {
        ...state,
      };
    case CREATEORDER:
      return {
        ...state,
      };
    default: // need this for default case
      return state;
  }
};

export default cartItemListReducer;
