import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    chatData: [],
    selectedChat: null,
}

const messengereSlice = createSlice({
    name: 'dataMessenger',
    initialState,
    reducers: {
        changeChatData: (state, action) => {
            state.chatData = action.payload
        },
        choiceCurrentChat: (state, action) => {
            state.chatData = state.chatData.map((element) => element.id === action.payload.id ? {
                ...element,
                unread_count: 0
            } : element)
            state.selectedChat = action.payload
        },
        deleteCurrentChat: (state, action) => {
            state.chatData = state.chatData.filter((element) => element.id !== action.payload.id)
            state.selectedChat = null
        }
    },
})

export const {changeChatData, choiceCurrentChat, deleteCurrentChat} = messengereSlice.actions

export default messengereSlice.reducer