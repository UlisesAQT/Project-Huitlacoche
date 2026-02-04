import {configureStore} from '@reduxjs/toolkit';
import foodSlice from './foodSlice'


export const store = configureStore({
    reducer: {
       food : foodSlice
    }
});