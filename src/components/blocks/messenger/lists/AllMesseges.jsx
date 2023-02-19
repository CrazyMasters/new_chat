import React from 'react';
import {Box, Typography} from '@mui/material'
import {format} from "date-fns";
import {ru} from 'date-fns/locale'


const AllMesseges = ({message}) => {

    const time = message.created_localize.split(' ')
    const arrayOfNumbers = time[0].split('.')
    const weekDay = format(new Date(`${arrayOfNumbers[1]}/${arrayOfNumbers[0]}/${arrayOfNumbers[2]}`), 'MMMM', {locale: ru})

    return (
        <>
            <Box key={message.id} title={message._user?.name}
                 className={!message.my ? 'message-block' : "message-block__my"}>
                <Box className={!message.my ? 'message' : "message__my"}>
                    <Typography>{message.text}</Typography>
                    <sub>{time[1]}</sub>
                </Box>
            </Box>
            {message?.changedData && (
                <Box bgcolor='#00000070' width='max-content' m='0 auto 10px auto' borderRadius='8px' p='5px 10px'
                     display='flex'
                     justifyContent='center'
                     alignItems='center'>
                    <Typography color='white'>
                        {`${arrayOfNumbers[0]} ${weekDay}`}
                    </Typography>
                </Box>
            )}
        </>
    );
};

export default AllMesseges;