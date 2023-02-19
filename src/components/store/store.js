import {configureStore} from '@reduxjs/toolkit';
import messengereSlice from './slices/messengerSlice'
import userSlice from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        dataMessenger: messengereSlice,
        user: userSlice
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
                serializableCheck: false
            }
        ).concat(

        )
});



