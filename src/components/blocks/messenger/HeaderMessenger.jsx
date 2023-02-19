import React from 'react';

import {Box, Checkbox, ListItemButton, Typography} from "@mui/material";

const navigationMessengerButtons = [
    {
        id: 1,
        title: 'Все сообщения',
        className: 'cheange_btn_all_messages'
    },
    {
        id: 2,
        title: 'Жалобы',
        className: 'cheange_btn_reports'
    }
]
const HeaderMessenger = ({chat, changeTab, connected, tab}) => {

    return (
        <Box display='flex' flexDirection='column'>
            <Box display='flex' justifyContent='space-between' width='100%' height='70px' p='10px' boxShadow={1}>
                <Box className='header-info'>
                    <Box className='mess-header_photo'>
                        <img src={chat.helpdesk_user_photo !== null ? chat.helpdesk_user_photo : ''} alt="Картинки"/>
                    </Box>
                    <Typography>{chat.name}</Typography>
                </Box>
                <Box className='connection-icons'>
                    Статус подключения:
                    <Checkbox checked={connected} variant='secondary'/>
                </Box>
            </Box>

            <Box display='flex' height='39px' boxShadow={1} zIndex={1}>
                {navigationMessengerButtons.map((element) => (
                    <ListItemButton className='cursor' display='flex' justifyContent='center' alignItems='center'
                                    key={element.id}
                                    onClick={() => changeTab(element.id)} sx={{padding: 0, maxWidth: '50%'}}>
                        <Box width='100%' display='flex' justifyContent='center' alignItems='center' boxShadow={1}
                             height='100%'>
                            <Typography variant='body1' color={element.id === tab ? 'secondary' : ''}>
                                {element.title}
                            </Typography>
                        </Box>
                    </ListItemButton>
                ))}
            </Box>
        </Box>
    );
};

export default HeaderMessenger;