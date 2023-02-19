import React from 'react';
import {Avatar, Box, Button, Paper, Typography} from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ModalImage from "../../../modalImage/ModalImage";
import useModal from "../../../../wrappers/modal/useModal";

const CurrentReport = ({report, closeReport}) => {
    const {isModalOpen, openModal, closeModal} = useModal()
    return (
        <Box>
            <Paper elevation={4}>
                <Box position='relative' p='10px' display='flex' gap='10px' flexDirection='column'>
                    <Box top='10px' right='10px' position='absolute'>#{report.id}</Box>
                    <Box display='flex' gap='10px'>
                        <Avatar sx={{width: '60px', height: '60px'}} src={report._reported_user?.avatar}/>
                        <Box>
                            <Typography>{report._user?.name}</Typography>
                            <Box display='flex' gap='5px' alignItems='center'>
                                <PhoneAndroidIcon fontSize='small'/>
                                <Typography>{report?._reported_user?.phone}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    {report.img && (
                        <Box>
                            <Box mb='10px'>
                                <Typography>
                                    Фото нарушения
                                </Typography>
                            </Box>
                            <Box display="flex" gap="10px" justifyContent="flex-start">
                                <Box maxWidth="100px" maxHeight="100px">
                                    <Box onClick={openModal} className="review__box">
                                        <img className="review__img pointer" src={report.img}
                                             alt='Изображение'/>
                                    </Box>
                                </Box>
                                <ModalImage open={isModalOpen} image={report.img} closeModal={closeModal}/>
                            </Box>
                        </Box>
                    )}
                    <Box>
                        <Box>
                            {report.date}
                        </Box>
                        <Typography>
                            Сообщение о нарушении
                        </Typography>
                        <Typography>
                            {report.comment}
                        </Typography>
                    </Box>

                    <Box>
                        <Button onClick={() => closeReport({report})} disabled={!report.active}
                                size='small' variant='contained' fullWidth>
                            {report.active ? "Завершить" : "Завершено"}
                        </Button>
                    </Box>

                </Box>
            </Paper>
        </Box>
    );
};

export default CurrentReport;