import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
  sort: {
    name: "popular",
    sortProperty: "rating",
  },
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setCategory, setSort } = filterSlice.actions;
// export const { setSort } = filterSlice.actions;

export default filterSlice.reducer;

// const initialState = {
//   value: 0,
// };

// export const filterSlice = createSlice({
//   name: "filter",
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload;
//     },
//   },
// });

// export const { increment, decrement, incrementByAmount } = filterSlice.actions;

// export default filterSlice.reducer;
