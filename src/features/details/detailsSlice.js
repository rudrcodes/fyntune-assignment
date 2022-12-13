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
  //       sName: 'rudr',
  //       sArea: "Thane",
  //       sCategory: "Grocery",
  //       sOpeningDate: 4,
  //       sClosingDate: 5,
  //     },
  //     {
  //       sName: 'rudr',
  //       sArea: "Pune",
  //       sCategory: "Baker",
  //       sOpeningDate: 4,
  //       sClosingDate: 5,
  //     },
  //     {
  //       sName: 'rudr',
  //       sArea: "Mumbai Suburban",
  //       sCategory: "Chemist",
  //       sOpeningDate: 4,
  //       sClosingDate: 5,
  //     },
  //     {
  //       sName: 'rudr',
  //       sArea: "Nashik",
  //       sCategory: "Stationery Shop",
  //       sOpeningDate: 4,
  //       sClosingDate: 5,
  //     },
  //     {
  //       sName: 'rudr',
  //       sArea: "Nagpur",
  //       sCategory: "Baker",
  //       sOpeningDate: 4,
  //       sClosingDate: 5,
  //     },
  //     {
  //       sName: 'rudr',
  //       sArea: "Ahmednagar",
  //       sCategory: "Grocery",
  //       sOpeningDate: 4,
  //       sClosingDate: 5,
  //     },
  //     {
  //       sName: 'rudr',
  //       sArea: "Thane",
  //       sCategory: "Baker",
  //       sOpeningDate: 4,
  //       sClosingDate: 5,
  //     },
  //     {
  //       sName: 'rudr',
  //       sArea: "Nagpur",
  //       sCategory: "Baker",
  //       sOpeningDate: 4,
  //       sClosingDate: 5,
  //     },
  //   ],
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
      state.shops.splice(
        state.shops.findIndex((arrow) => arrow.id === action.payload),
        1
      );
      localStorage.setItem("shops", JSON.stringify(state.shops));
    },
  },
});

export default detailsSlice.reducer;
export const { addShop, removeShop } = detailsSlice.actions;
