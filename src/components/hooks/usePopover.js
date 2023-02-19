import React from 'react';

const usePopover = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const popoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const popoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    return {anchorEl, popoverOpen, popoverClose, open}
};

export default usePopover;