import React from 'react';
import {Box, Typography} from "@mui/material";

import CurrentReport from "./CurrentReport";

const Reports = ({reports, closeReport}) => {

    return (
        <Box display='flex' flexDirection='column' gap='10px' maxWidth='600px' width='100%' m='0 auto'>
            {reports.length > 0 ?
                reports.map((element) => (
                    <CurrentReport closeReport={closeReport} report={element} key={element.id}/>
                ))
                : <Typography className="list_reports_is_empty">Список жалоб пуст</Typography>
            }
        </Box>

    );
};

export default Reports;