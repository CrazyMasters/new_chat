import React, {useEffect, useState} from "react";
import {Alert, Button, Snackbar, TextField, Box, Paper, Typography} from "@mui/material";
import API, {server} from "../../http/api";
import {useNavigate} from "react-router-dom";
import {useEnqueueSnackbar} from "../../hooks/snackbar/useEnqueueSnackbar";
import LoadingProgress from "../../blocks/loadingProgress/LoadingProgress";


function Login() {
    const [login, setLogin] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const navigate = useNavigate()
    const {openSnackbar} = useEnqueueSnackbar()

    const makeLogin = async (e) => {
        e.preventDefault()
        if (login === '') {
            openSnackbar({message: 'Логин не может быть пустым', variant: 'warning'})
            return
        }
        if (password === '') {
            openSnackbar({message: 'Логин не может быть пустым', variant: 'warning'})
            return
        }
        try {
            const response = await server.post('/authentication/login_user_with_role/', {
                login,
                password
            })
            console.log(response)
        } catch (e) {
            openSnackbar({message: e.message, variant: 'error'})

        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Box display='flex' justifyContent='center' height='100vh' alignItems='center'>
            <form onSubmit={makeLogin}>

                <Paper elevation={7}>
                    <Box p='10px' display='flex' flexDirection='column' gap='10px'>
                        <Typography>
                            Авторизация
                        </Typography>
                        <TextField
                            onChange={(e) => {
                                setLogin(e.target.value)
                            }}
                            className={'form-input'}
                            required
                            fullWidth
                            id="outlined-required"
                            label="Логин"
                            size="small"
                        />
                        <TextField
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            fullWidth
                            className={'form-input'}
                            required
                            id="outlined-required"
                            label="Пароль"
                            size="small"
                        />
                        <Button type='submit' variant="contained">
                            <LoadingProgress isLoading={isLoading} title='Войти'/>
                        </Button>
                    </Box>
                </Paper>
            </form>
        </Box>

    );
}

export default Login;
