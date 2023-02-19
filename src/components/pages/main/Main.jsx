import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Container, Typography} from "@mui/material";
import api from "../../http/api";
import "./Main.css"
import {useNavigate} from "react-router-dom";
import Messenger from "../../blocks/messenger/Messenger";

import SearchInputUser from "../../blocks/messenger/searchInputUser/SearchInputUser";
import {useDispatch, useSelector} from "react-redux";
import {changeChatData} from "../../store/slices/messengerSlice";
import ChatItemUser from "../../blocks/messenger/chatItemUser/ChatItemUser";
import Logout from "./modals/Logout";

const Main = () => {
    let [nextPage, setNextPage] = useState(null)
    let [noData, setNoData] = useState(false)
    const navigate = useNavigate()
    const wss1 = useRef()
    const [connected, setConnected] = useState(false)

    const {chatData, selectedChat} = useSelector((state) => state.dataMessenger)
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.token === undefined || localStorage.token === null) {
            navigate("/login");
        }

        api('chats/helpdesk_chat/')
            .then((response) => {
                console.log(response);
                dispatch(changeChatData(response.data.results))
                if (response.data.next == null) {
                    setNoData(true)
                } else {
                    setNoData(false)
                }
                connectToSocket()
                setNextPage(response.data.next)
            })
    }, [])

    useEffect(() => {
        if (nextPage === null) {
            setNoData(true)
        } else if (nextPage !== null) {
            setNoData(false)
        }
    }, [nextPage])

    function loadChats() {
        console.log("Загрузка чата");
        api('chats/helpdesk_chat')
            .then((response) => {
                dispatch(changeChatData(response.data.results))

            })


    }

    function unsubscribe(id, index) {
        api.post('chats/helpdesk_chat/' + id + '/unsubscribe/')
            .then((response) => {
                if (response.status < 205) {
                    let newChatData = [...chatData]
                    newChatData[index].participant = false
                    dispatch(changeChatData(newChatData))
                }
            })
    }

    function subscribe(id, index) {
        api.post('chats/helpdesk_chat/' + id + '/subscribe/')
            .then((response) => {
                if (response.status < 205) {
                    let newChatData = [...chatData]
                    newChatData[index].participant = true
                    dispatch(changeChatData(newChatData))

                }
            })
    }

    async function fetchChats() {
        await api(nextPage)
            .then((response) => {
                setNextPage(response.data.next)
                dispatch(changeChatData([...chatData, ...response.data.results]))

            })
    }

    function connectToSocket() {
        wss1.current = new WebSocket("wss://api.slog.eco/ws/helpdesk_admin_messages/?tk=" + localStorage.getItem('token')); // создаем ws соединение
        // wss://api.slog.eco/ws/helpdesk_admin_messages/?tk={token}
        // wss1.current =  new WebSocket("wss://api.slog.eco/ws/chats/" + '?tk=' + localStorage.getItem('token')); // создаем ws соединение
        wss1.current.onopen = () => {
            console.log("Сокет боковой открытие");
            console.log(wss1);
            setConnected(true)
        };
        wss1.current.onmessage = (mes) => {
            console.log("Сокет боковой");
            console.log(mes);
            loadChats()
        }
        wss1.current.onerror = (err) => {
            console.log("Ошибка бокового сокета");
            console.log(err);
            setTimeout(connectToSocket, 5000)
        }
        wss1.current.onclose = (res) => {
            console.log("Сокет боковой закрытие");
            console.log(res);
            setConnected(false)
            if (res.code !== 1000) {
                setTimeout(connectToSocket, 5000)
            }
        }
    }

    return (
        <Box className='chat-bg'>
            <Box className='header-fake'/>
            <Container sx={{borderRadius: '8px'}} className='chat-box_container' maxWidth="xl">
                <Box width='30%' overflow='none' borderRadius='8px'>
                    <Box display='flex' justifyContent='space-between' width='100%' alignItems='center'>
                        <Box display='flex' gap='10px' alignItems='center'>
                            {/*<Box borderRadius='8px' overflow='hidden' display='flex' m='10px'>*/}
                            {/*    <img className='slog-main' src={logo} alt="logo"/>*/}
                            {/*</Box>*/}
                            <Box position='relative'>
                                <Typography>SLOG SUPPORT</Typography>
                                {connected ?
                                    <Box position='absolute' top='3px' right='-5px' width='6px' height='6px'
                                         borderRadius='50%'
                                         bgcolor='secondary.main'/> :
                                    <Box position='absolute' top='3px' right='-5px' width='5px' height='5px'
                                         borderRadius='50%' bgcolor='error.main'/>}
                            </Box>
                        </Box>

                        <Logout/>
                    </Box>

                    <Box>
                        <SearchInputUser/>
                        <Box display='flex' flexDirection='column' overflow='auto' height='80vh'>
                            {chatData.map((data) => (
                                <ChatItemUser key={data.id} data={data}/>
                            ))}
                            {noData !== true &&
                                <Button className='more-button' onClick={fetchChats} color="success"
                                        variant="contained">Ещё</Button>
                            }
                        </Box>
                    </Box>
                </Box>
                <Messenger key={selectedChat} chat={selectedChat} loadChats={loadChats}/>
            </Container>
        </Box>
    );
};

export default React.memo(Main);
