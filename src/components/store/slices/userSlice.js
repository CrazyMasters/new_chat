import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isAuth: false
}

const userSlice = createSlice({
    name: 'dataUser',
    initialState,
    reducers: {
        changeIsAuth: (state) => {
            state.isAuth = !state.isAuth
        },

    },
})

export const {changeIsAuth} = userSlice.actions

export default userSlice.reducer