export const initialInventory = [];

export function InventoryReducer(state, action) {
    switch (action.type) {
        case 'INIT': 
        return action.payload;
        case 'ADD_ITEM':
            return[...state, action.payload];  
        case 'REMOVE_ITEM':
            return state.filter(i => i.id !== action.payload.id);
        case 'UPDATE_ITEM':
            return state.map(i => i.id === action.payload.id ?{...i, ...action.payload}: i );
        default:
            return state;    
}
}
