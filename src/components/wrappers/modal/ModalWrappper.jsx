import React from 'react';
import {Box, Fade, Modal, Paper, Typography, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const ModalWrapper = ({children, open, handleClose, title}) => {


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Fade in={open}>
                <Box display="flex" justifyContent="center" alignItems='center' width="100vh"
                     height="100vh"
                     m="auto">
                    <Paper sx={{maxWidth: '500px', width: '100%', height: 'max-content'}}>
                        <Box p="10px 20px">
                            <Box display='flex' justifyContent='space-between' alignItems='center'>
                                <Typography variant='h6'>{title}</Typography>
                                <IconButton onClick={handleClose} color='primary'>
                                    <CloseIcon fontSize='small'/>
                                </IconButton>
                            </Box>
                            {children}
                        </Box>
                    </Paper>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ModalWrapper;