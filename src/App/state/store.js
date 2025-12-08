import {configureStore} from '@reduxjs/toolkit';
import  InventoryReducer  from './inventorySlice';


export const store = configureStore({
    reducer: {
        inventory: InventoryReducer
    }
});