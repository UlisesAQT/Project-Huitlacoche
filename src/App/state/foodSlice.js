import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  food: [],
  isLoading: false,
  error: null
}


export const fetchFood = createAsyncThunk(
    'food/fetchFood',
    async (arg, thunkApi) => {
        try{
            const response = await fetch('http://localhost:3001/food');
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)



const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {},
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
    }

});
export default foodSlice.reducer