import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../src/redux/postsSlice'

export default configureStore({
  reducer: {
    main: postsReducer
  }
})