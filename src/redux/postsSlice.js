import { createSlice } from '@reduxjs/toolkit'
import {all_select} from 'listReducer.js'


const postsSlice = createSlice({
  name: 'posts',
  all_select,
  reducers: {}
})

export default postsSlice.reducer