import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
  currentPage: 1,
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.category = Number(action.payload.category);
      state.sort.sortProperty = action.payload.sortProperty;
    },
  },
});

export const { setCategory, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
