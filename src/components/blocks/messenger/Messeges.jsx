import React from 'react';
import AllMesseges from "./lists/AllMesseges";
import {Box} from "@mui/material";

const splitingArray = (string) => {
    if (string) {

        return string.split(' ')[0]
    }
    return ''
}

const Messeges = ({messages}) => {
    const [copy, setCopy] = React.useState([])
    React.useEffect(() => {
        const newArray = messages.map((element, index) => {

            if (splitingArray(element.created_localize) !== splitingArray(messages[index + 1]?.created_localize)) {
                return {...element, changedData: true}
            }
            return element
        })

        setCopy(newArray)
    }, [messages])


    return (
        <Box display='flex' flexDirection='column-reverse'>
            {copy && copy.map((message) => (
                <AllMesseges key={message.id} message={message}/>
            ))}
        </Box>

    )
};

export default Messeges;