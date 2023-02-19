import React from 'react';
import {Box, Modal} from "@mui/material";

const ModalImage = ({open, closeModal, image}) => {
    return (
        <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box onClick={closeModal} display="flex" top="0" left="0" right="0" bottom="0" justifyContent="center"
                 alignItems="center"
                 width="100%" height="100%">
                <Box maxWidth="600px" width="100%" height='max-content'>
                    <img className="review__img" src={image} alt="Изображение"/>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalImage;