import { createSlice } from "@reduxjs/toolkit";

const shopInit =
  localStorage.getItem("shops") != null
    ? JSON.parse(localStorage.getItem("shops"))
    : [];

// initial state
const initialState = {
    shops: shopInit,
//   shops: [
//     {
//       sName: 1,
//       sArea: "Thane",
//       sCategory: "Grocery",
//       sOpeningDate: 4,
//       sClosingDate: 5,
//     },
//     {
//       sName: 1,
//       sArea: "Pune",
//       sCategory: "Baker",
//       sOpeningDate: 4,
//       sClosingDate: 5,
//     },
//     {
//       sName: 1,
//       sArea: "Mumbai Suburban",
//       sCategory: "Chemist",
//       sOpeningDate: 4,
//       sClosingDate: 5,
//     },
//     {
//       sName: 1,
//       sArea: "Nashik",
//       sCategory: "Stationery Shop",
//       sOpeningDate: 4,
//       sClosingDate: 5,
//     },
//     {
//       sName: 1,
//       sArea: "Nagpur",
//       sCategory: "Baker",
//       sOpeningDate: 4,
//       sClosingDate: 5,
//     },
//     {
//       sName: 1,
//       sArea: "Ahmednagar",
//       sCategory: "Grocery",
//       sOpeningDate: 4,
//       sClosingDate: 5,
//     },
//     {
//       sName: 1,
//       sArea: "Thane",
//       sCategory: "Baker",
//       sOpeningDate: 4,
//       sClosingDate: 5,
//     },
//     {
//       sName: 1,
//       sArea: "Nagpur",
//       sCategory: "Baker",
//       sOpeningDate: 4,
//       sClosingDate: 5,
//     },
//   ],
  // sName: "",
  // sArea: "",
  // sCategory: "",
  // sOpeningDate: "",
  // sClosingDate: "",
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    addShop: (state, action) => {
      console.log("added");
      state.shops.push(action.payload);
      localStorage.setItem("shops", JSON.stringify(state.shops));
    },
    removeShop: (state, action) => {
      state.shops = state.shops.filter((shop) => shop.id !== action.payload);
      localStorage.setItem("shops", JSON.stringify(state.shops));
    },
    
  },
});

export default detailsSlice.reducer;
export const { addShop,removeShop } = detailsSlice.actions;
