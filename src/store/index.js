import { configureStore } from '@reduxjs/toolkit'
import auth from './auth'
import notification from './notification'
export default configureStore({
    reducer: { auth, notification },
})
