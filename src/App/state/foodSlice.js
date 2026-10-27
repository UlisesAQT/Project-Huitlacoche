import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  food: [],
  isLoading: false,
  error: null,
};
// this is for the server fetching the API
export const fetchFood = createAsyncThunk(
  "food/fetchFood",
  async (arg, thunkApi) => {
    try {
      const response = await fetch("http://localhost:3001/food");
      // fetch only fails if the server can't be reached. A 404 or 500 still counts as
      // "success", so we check ourselves to keep bad data out of the store.
      if (!response.ok) {
        throw new Error(`Couldn't load food (status ${response.status})`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

// this is the state for modal adding food
export const addFood = createAsyncThunk(
  "food/addFood",
  async (newFood, thunkApi) => {
    try {
      const response = await fetch("http://localhost:3001/food", {
        method: "POST",
        body: JSON.stringify(newFood),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Something went wrong, please try again");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    adjustQuantity: (state, action) => {
      // this works for the buttons adding and subtracting, i also have to update to save the state
      const itemToUpdate = state.food.find(
        (item) => item.id === action.payload.id,
      );
      if (itemToUpdate) {
        const nextValue = itemToUpdate.quantity + action.payload.amount;
        if (nextValue >= 0) {
          itemToUpdate.quantity = nextValue;
        }
      }
    },
    updateFood: (state, action) => {
      // this is for the FoodCard.jsx to update food
      const index = state.food.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.food[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.food = action.payload;
      })
      .addCase(fetchFood.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.food.push(action.payload);
      })
      .addCase(addFood.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default foodSlice.reducer;
export const { adjustQuantity, updateFood } = foodSlice.actions;
