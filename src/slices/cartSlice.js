import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],

  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0 ,

  totalItem: localStorage.getItem("totalItem")
    ? JSON.parse(localStorage.getItem("totalItem"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, value) {
      const course = value.payload;
      const indx = state.cart.findIndex((item) => item._id === course._id);
      if (indx >= 0) {
        toast.error("Course Already present in the cart.");
        return;
      }
      state.cart.push(course);
      ++state.totalItem;
      state.total += parseInt(course.price);

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalItem", JSON.stringify(state.totalItem));
      localStorage.setItem("total", JSON.stringify(state.total));

      toast.success("Course addded to cart.");
    },
    removefromCart(state,value){
        const courseID = value.payload;
        const indx = state.cart.findIndex((item)=> item._id ===courseID );

        if(indx>=0){
            --state.totalItem;
            state.total -= state.cart[indx].price;
            state.cart.splice(indx,1);

            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItem", JSON.stringify(state.totalItem))
            toast.success("Course removed from cart")
        }
    },
      resetCart(state){
        state.cart = [];
        state.total=0;
        state.totalItem=0;

        localStorage.removeItem('cart');
        localStorage.removeItem('total');
        localStorage.removeItem('totalItem');

      }
  },
});

export const {  addToCart , removefromCart , resetCart } = cartSlice.actions;
export default cartSlice.reducer;
