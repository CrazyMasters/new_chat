import React, {useCallback, useEffect, useRef, useState} from "react";
import "./Messenger.css"
import api from "../../http/api";
import {Box, Button} from "@mui/material";
import TextFieldMessage from "./textFieldMessage/TextFieldMessage";
import HeaderMessenger from "./HeaderMessenger";
import {useDispatch} from "react-redux";
import Reports from "./lists/Reports/Reports";
import {changeChatData} from "../../store/slices/messengerSlice";
import Messeges from "./Messeges";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Messenger({chat, loadChats}) {
    let [messages, setMessages] = useState([])
    let [reports, setReports] = useState([])
    const [tab, setTabs] = React.useState(1)
    const [connected, setConnected] = useState(false)
    let [noData, setNoData] = useState(false)
    let [nextPage, setNextPage] = useState(1)
    let wss = useRef()
    const dispatch = useDispatch()

    function fetchMessages() {
        if (noData == null) {
            return
        }

        api(nextPage)
            .then((response) => {
                dispatch(changeChatData(messages.concat(response.data.results)))
                setNextPage(response.data.next)
                if (response.data.next === null) {
                    setNoData(true)
                } else {
                    setNoData(false)
                }
            })
    }

    useEffect(() => {
        if (chat === null) {
            return
        }

        function fetchData() {
            api('chats/helpdesk_messages/?chat=' + chat.id)
                .then((response) => {
                    setMessages(response.data.results)
                    setNextPage(response.data.next)
                    if (response.data.next != null) {
                        setNoData(false)
                    } else {
                        setNoData(true)
                    }
                })
            api('https://api.slog.eco/accounts/reports/?user=' + chat.helpdesk_user).then((response) => {
                console.log(response);
                setReports(response.data.results)
            })
        }

        fetchData()
    }, [chat])

    useEffect(() => {
        if (chat === null) {
            return
        }
        connectToSocket()
        return () => {
            wss.current.close()

        }
    }, [chat])


    const connectToSocket = useCallback(() => {
        wss.current = new WebSocket("wss://api.slog.eco/ws/helpdesk_admin_messages/" + chat.id + '/?tk=' + localStorage.getItem('token')); // создаем ws соединение
        wss.current.onopen = (res) => {
            setConnected(true)
        };
        wss.current.onmessage = (mes) => {
            loadMessages()
        }
        wss.current.onerror = (res) => {
        }
        wss.current.onclose = (res) => {
            setConnected(false)
            if (res.wasClean !== true) {
                setTimeout(connectToSocket, 3000)
            }
        }
        return () => {
            wss.current.close()
        }
    }, [chat])


    async function loadMessages() {
        await api('chats/helpdesk_messages/?chat=' + chat.id)
            .then((response) => {
                setMessages(response.data.results)
                setNextPage(response.data.next)
                if (response.data.next != null) {
                    setNoData(false)
                } else {
                    setNoData(true)
                }
            })
        await api('https://api.slog.eco/accounts/reports/?user=' + chat.helpdesk_user).then((response) => {
            setReports(response.data.results)
        })
    }


    const closeReport = async ({report}) => {
        await api.post(`https://api.slog.eco/accounts/reports/${report.id}/complete/`).then((response) => {
            loadMessages()
            loadChats()
        })
    }

    const changeTab = (value) => {
        setTabs(value)
    }

    return (
        <Box width='70%' display='flex' flexDirection='column'>
            {chat === null ? (
                <AccountCircleIcon />
            ) : (
                <>
                    <HeaderMessenger changeTab={changeTab} tab={tab} chat={chat} connected={connected}/>
                    <Box id="chatterbox" className='mess_main'>
                        {tab === 1 ? (
                            <Box display='flex' flexDirection='column-reverse'>
                                <Messeges messages={messages}/>
                                {!noData &&
                                    <Button onClick={fetchMessages} color="success" variant="contained">Ещё</Button>}
                            </Box>
                        ) : (
                            <Reports reports={reports} message={messages}
                                     closeReport={closeReport}/>
                        )}
                    </Box>
                    <TextFieldMessage id={chat.id} loadMessages={loadMessages}/>
                </>
            )}
        </Box>

    );
}

export default React.memo(Messenger);
