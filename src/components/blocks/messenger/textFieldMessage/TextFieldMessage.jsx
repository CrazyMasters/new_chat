import React from 'react';
import {Box, CircularProgress, Collapse, IconButton, Paper, TextField} from "@mui/material";
import api from "../../../http/api";
import {useEnqueueSnackbar} from "../../../hooks/snackbar/useEnqueueSnackbar";
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const TextFieldMessage = ({loadMessages, id}) => {
    const [inputMessage, setInputMessage] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const {openSnackbar} = useEnqueueSnackbar()

    const sendNewMessage = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const response = await api.post('chats/helpdesk_messages/', {
                chat: id,
                text: inputMessage,
            })
            if (response.status === 201) {
                setInputMessage('')
                loadMessages()
            }
        } catch (e) {
            openSnackbar({message: e.message, variant: 'error'})
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <Box p='5px'>
            <form onSubmit={(e) => sendNewMessage(e)}>
                <Box display='flex' gap='10px' width='100%' alignItems='center'>
                    <Paper sx={{width: '100%'}}>
                        <TextField fullWidth label='Введите сообщение' value={inputMessage}
                                   onChange={(e) => setInputMessage(e.currentTarget.value)}/>
                    </Paper>
                    <Collapse in={inputMessage !== ''} unmountOnExit>
                        <Box>
                            <IconButton disabled={isLoading} type='submit' color='primary' variant='contained'>
                                {isLoading ? (
                                    <CircularProgress size='20px'/>
                                ) : (
                                    <SendRoundedIcon/>
                                )}
                            </IconButton>
                        </Box>
                    </Collapse>
                </Box>
            </form>
        </Box>
    )
};

export default TextFieldMessage;