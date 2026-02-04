// import { createSlice } from "@reduxjs/toolkit";
// import {FOOD} from '../testData'
// const initialState = FOOD || [];

// const inventorySlice = createSlice({
//   name: 'inventory',
//   initialState,
//   reducers: {
//     addFood: (state, action) => {    
//       state.push(action.payload);
//     },
    
//     removeFood: (state, action) => {
//       const index = state.findIndex(
//         (food) => food.name === action.payload.name);
//       if (index !== -1) {
//         state[index].quantity -= action.payload.amount || 1;
//         if (state[index].quantity <= 0) {
//           state.splice(index, 1);
//         }
//       }
//     },
//         updateFood: (state, action) => {
//             const index = state.findIndex(food => food.name === action.payload.name);
//             if (index !== -1) {
//                 state[index] = {... state[index], ...action.payload };
//             }
//         },
//         clearInventory: () => {
//             return [];
//     }
//   },
// });
// export const { addFood, removeFood, updateFood, clearInventory } = inventorySlice.actions;
// export default inventorySlice.reducer;