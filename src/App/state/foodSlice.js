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

// this saves an edited food item to the server so the change survives a page refresh.
// it has the same name the old reducer had, so the components that dispatch updateFood didn't need to change
export const updateFood = createAsyncThunk(
  "food/updateFood",
  async (updatedFood, thunkApi) => {
    try {
      // the id in the URL tells the server which item to replace
      const response = await fetch(`http://localhost:3001/food/${updatedFood.id}`, {
        // PUT replaces the whole item, which works because we always send the full object
        method: "PUT",
        body: JSON.stringify(updatedFood),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Couldn't save changes (status ${response.status})`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);


// this deletes a food item on the server so a bulk-edit delete stays deleted after a refresh

export const removeFood = createAsyncThunk(
  "food/removeFood",
  async (id, thunkApi) => {
    try{
        // the id in the URL tells the server which item to delete
        const response = await fetch(`http://localhost:3001/food/${id}`, {
          method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Couldn't delete food (status ${response.status})`);
    }
      // we return the id instead of the server's reply, because the reducer only needs to know which item to remove
    return id;
    } catch (error){
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
      })
      // no pending case on purpose: setting isLoading here would flash a spinner on every +/- click
      .addCase(updateFood.fulfilled, (state, action) => {
        // only update Redux after the server says the save worked, so the two never disagree
        const index = state.food.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.food[index] = action.payload;
        }
      })
      .addCase(updateFood.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFood.fulfilled, (state, action) => {
        // Keep every item except the one the server just deleted
        state.food = state.food.filter(
          (item) => item.id !== action.payload,
        );
      })
      .addCase(removeFood.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export default foodSlice.reducer;
export const { adjustQuantity } = foodSlice.actions;
