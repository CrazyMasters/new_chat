import React from 'react';
import {Popover} from "@mui/material";


const HoverPopoverWrapper = ({open, anchorEl, onClose, children}) => {

    return (
        <Popover
            id="mouse-over-popover"
            sx={{
                pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            onClose={onClose}
            disableRestoreFocus
        >
            {children}
        </Popover>
    );
};

export default HoverPopoverWrapper;