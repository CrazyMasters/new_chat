import React from 'react';
import {Box, Button, IconButton, ListItemButton, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {choiceCurrentChat, deleteCurrentChat} from "../../../store/slices/messengerSlice";
import useModal from "../../../wrappers/modal/useModal";
import ModalWrapper from "../../../wrappers/modal/ModalWrappper";
import api from "../../../http/api";
import {useEnqueueSnackbar} from "../../../hooks/snackbar/useEnqueueSnackbar";
import LoadingProgress from "../../loadingProgress/LoadingProgress";
import CheckIcon from '@mui/icons-material/Check';
import ReportIcon from '@mui/icons-material/Report';
import EmailIcon from '@mui/icons-material/Email';
import InfoBlock from "./InfoBlock";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ChatItemUser = ({data}) => {
    const selectedChat = useSelector((state) => state.dataMessenger.selectedChat)
    const [isLoading, setIsLoading] = React.useState()
    const {openModal, closeModal, isModalOpen} = useModal()
    const {openSnackbar} = useEnqueueSnackbar()
    const dispatch = useDispatch()

    const choiceChat = () => {
        dispatch(choiceCurrentChat(data))
    }
    const deleteChat = async () => {
        try {
            setIsLoading(true)
            const response = await api.post(`chats/helpdesk_chat/${data.id}/close_ticket/`)
            if (response.status === 200) {
                dispatch(deleteCurrentChat({id: data.id}))
                openSnackbar({message: 'Чат успешно удален', variant: 'success'})
            }
        } catch (e) {
            openSnackbar({message: e.message, variant: 'error'})
        } finally {
            setIsLoading(false)
        }
    }
    const isCurrentChatActive = selectedChat?.id === data.id
    const isHaveNewMessage = data.unread_count > 0
    return (
        <Box boxShadow='0 2px 4px -3px lightgrey' border='1px solid white'>
            <ListItemButton className='chat-item'
                            sx={{background: isCurrentChatActive ? "#9fe194" : isHaveNewMessage ? 'aliceblue' : ''}}>
                <Box onClick={() => choiceChat(data)}
                     className='chat-img'>
                    <Box>
                        {data.helpdesk_user_photo ? (
                            <img src={data.helpdesk_user_photo} alt="Аватар"/>
                        ) : (
                            <AccountCircleIcon/>
                        )}
                    </Box>
                </Box>
                <Box className='text-form'>

                    <Box onClick={() => choiceChat(data)} className='name-zone'>
                        {data.name}
                    </Box>

                    {!isLoading && (
                        <IconButton color='primary' onClick={openModal}>
                            <CheckIcon/>
                        </IconButton>
                    )}

                    <Box className='unread'>
                        {data.unread_count !== 0 && (
                            <InfoBlock color='primary' count={data.unread_count} Icon={<EmailIcon fontSize='small'/>}/>
                        )}
                        {data.active_reports_count !== 0 && (
                            <InfoBlock color='error' count={data.active_reports_count}
                                       Icon={<ReportIcon fontSize='small'/>}/>
                        )}
                    </Box>
                    <ModalWrapper open={isModalOpen} handleClose={closeModal} title=' Удаление чата'>
                        <Typography>Вы уверены, что хотите закрыть выбранный чат?
                            Он откроется снова как только пользователь напишет новое сообщение
                        </Typography>
                        <Box display=' flex' gap='10px' mt='10px'>
                            <Button fullWidth disabled={isLoading} color='error' onClick={deleteChat}
                                    variant='contained'>
                                <LoadingProgress isLoading={isLoading} title='Удалить'/>
                            </Button>
                            <Button color='secondary' fullWidth disabled={isLoading} onClick={closeModal}
                                    variant='contained'>
                                <LoadingProgress isLoading={isLoading} title='Отмена'/>
                            </Button>
                        </Box>
                    </ModalWrapper>
                </Box>
            </ListItemButton>
        </Box>
    )
        ;
};

export default ChatItemUser;
