import React from 'react';
import {Box, CircularProgress, InputAdornment, Paper, TextField} from "@mui/material";
import api from "../../../http/api";
import {useEnqueueSnackbar} from "../../../hooks/snackbar/useEnqueueSnackbar";
import {useDispatch} from "react-redux";
import {changeChatData} from "../../../store/slices/messengerSlice";
import SearchIcon from '@mui/icons-material/Search';

const SearchInputUser = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [searchInput, setSearchInput] = React.useState('')
    const {openSnackbar} = useEnqueueSnackbar()
    const dispatch = useDispatch()
    const search = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await api.get(`chats/helpdesk_chat/?search=${searchInput}`)
            if (response.status === 200) {
                dispatch(changeChatData(response.data.results))
            }
        } catch (e) {
            openSnackbar({message: e.message, variant: 'error'})
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <Box m='10px'>
            <form onSubmit={(e) => search(e)}>
                <Paper elevation={2}>
                    <TextField size='small' variant='outlined' fullWidth value={searchInput}
                               label='Поиск по имени'
                               onChange={(e) => setSearchInput(e.currentTarget.value)} placeholder='Поиск'
                               type="text"
                               InputProps={{
                                   startAdornment: <InputAdornment position='start'>
                                       {isLoading ? <CircularProgress size='20px'/> : <SearchIcon/>}
                                   </InputAdornment>
                               }}
                    />
                </Paper>
            </form>
        </Box>
    )
        ;
};

export default SearchInputUser;