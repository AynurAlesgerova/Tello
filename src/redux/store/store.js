import {configureStore} from '@reduxjs/toolkit'

// reducers
import {basketReducer} from  '../reducer/basketReducer'
import { authReducer } from '../reducer/authReducer'


export const store= configureStore({
    reducer: {
        basketProducts: basketReducer,  
        auth: authReducer
    }
})