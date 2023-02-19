import React from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import usePopover from "../../../hooks/usePopover";
import HoverPopoverWrapper from "../../../wrappers/HoverPopoverWrapper";

const InfoBlock = ({count, Icon, color}) => {
    const {popoverClose, popoverOpen, anchorEl, open} = usePopover()

    return (
        <>
            <IconButton color={color} onMouseEnter={popoverOpen}
                        onMouseLeave={popoverClose}>
                {Icon}
            </IconButton>
            <HoverPopoverWrapper open={open} anchorEl={anchorEl} onClose={popoverClose}>
                <Box p='5px'>
                    <Typography color={color}>
                        {count}
                    </Typography>
                </Box>
            </HoverPopoverWrapper>
        </>
    );
};

export default InfoBlock;