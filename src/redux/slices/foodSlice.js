import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItems = createAsyncThunk(
  "food/fetchItemsStatus",
  async (params) => {
    const { sortBy, order, search, category, currentPage } = params;
    const { data } = await axios.get(
      `https://6293b734089f87a57ac4de66.mockapi.io/items?page=${currentPage}&limit=6&${
        category > 0 ? `category=${category}` : ""
      }${search}&sortBy=${sortBy}&order=${order}
      }`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading, success, error
};
const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchItems.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchItems.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "succes";
    },
    [fetchItems.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems } = foodSlice.actions;

export default foodSlice.reducer;
