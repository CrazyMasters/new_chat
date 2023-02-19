import React from 'react';
import {Box, Button, IconButton, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {changeIsAuth} from "../../../store/slices/userSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import useModal from "../../../wrappers/modal/useModal";
import ModalWrapper from "../../../wrappers/modal/ModalWrappper";

const Logout = () => {
    const {openModal, closeModal, isModalOpen} = useModal()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const makeLogout = () => {
        localStorage.clear()
        navigate("/login")
        dispatch(changeIsAuth())
        closeModal()

    }
    return (
        <Box mr='10px'>
            <Box>
                <IconButton onClick={openModal} color="primary">
                    <LogoutIcon/>
                </IconButton>
            </Box>

            <ModalWrapper open={isModalOpen} handleClose={closeModal} title='Выход из системы'>
                <Typography>Вы действительно хотите выйти из системы?</Typography>
                <Box display='flex' gap='10px' mt='10px'>
                    <Button color='secondary' fullWidth variant='contained' onClick={makeLogout} autoFocus>Да</Button>
                    <Button fullWidth variant='contained' onClick={closeModal}>Нет</Button>
                </Box>
            </ModalWrapper>

        </Box>
    )
        ;
};

export default Logout;