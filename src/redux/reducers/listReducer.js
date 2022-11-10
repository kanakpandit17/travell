import { createSlice } from '@reduxjs/toolkit'

const all_select = []

const reducer = (state=all_select,action) =>{
    console.log(all_select,"action")
    switch(action.type){
        case 'add':
            state[action.position] = action.payload
            return state
        case 'delete':
            var valueatindex = state.at(action.position)
            state.splice(action.position,0)
            // state.splice(action.index,1)
            // state[action.index] = action.payload
            return state
        default:
            return state

    }
}


export default reducer;